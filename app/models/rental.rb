class Rental < ActiveRecord::Base

  UNAVAILABLE = 'unavailable'
  USING = 'using'
  RENTING = 'renting'
  OWNED = 'owned'
  DAYS_LIMIT = 14

  acts_as_paranoid

  # hashable id
  include Friendlyable

  belongs_to :user
  belongs_to :sporting_good, inverse_of: :rentals

  delegate :user, to: :sporting_good, prefix: :owner, :allow_nil => true

  after_initialize :set_total_days, :set_discount, :set_rental_cost
  validate :dates_are_vacant?, :has_agreed_to_terms?, :dates_not_today?, :dates_not_in_past?, :not_past_days_limit?

  has_many :ratings, :as => :rateable, dependent: :destroy

  scope :between_range, -> (start_date, end_date) { where('(start_date, end_date) overlaps (timestamp :start_date, timestamp :end_date)',
    :start_date => start_date, :end_date => end_date) }

  after_save :wait_to_complete, :send_confirmation_email, :send_rating_emails_when_ends

  # NOTE Get the owner of the rental
  def owner
    OwnerSerializer.new(self.sporting_good.user)
  end

  def is_available?
    dates_are_vacant? && dates_not_today? && dates_not_in_past?
  end

  def reindex_sporting_good item = nil
    self.sporting_good.index!
  end

  def get_price
    self.set_total_days
    self.set_discount
    self.set_rental_cost
  end

  def set_total_days
		self.total_days = 1 if self.end_date == self.start_date
    self.total_days = (self.start_date - self.end_date).to_i.abs + 1
  end

  def set_discount
    weeks_rented = (self.total_days - 1) / 7
    if weeks_rented > 0
      weeks_price = weeks_rented * self.sporting_good.price_per_week
      weeks_days_price = (weeks_rented * 7) * self.sporting_good.price_per_day
      return self.discount = (weeks_days_price - weeks_price).round(2)
    end
    self.discount = 0
  end

  def set_rental_cost
    sporting_good = SportingGood.find(self.sporting_good_id)
    self.sub_total = (sporting_good.price_per_day * self.total_days).round(2)
    self.total = (self.sub_total - self.discount).round(2)
  end

  def status user
    if user.rentals.find_by_id(id) && user.owned_rentals.find_by_id(id)
      USING
    elsif user.rentals.find_by_id(id)
      RENTING
    elsif user.owned_rentals.find_by_id(id)
      OWNED
    else
      UNAVAILABLE
    end
  end

  def title user
    status = status(user)
    if status == USING
      "Your using #{ sporting_good.title.capitalize } at this time"
    elsif status == RENTING
      "Your renting #{ sporting_good.title.capitalize } from #{ sporting_good.user.firstname.capitalize }"
    elsif status == OWNED
      "#{ self.user.firstname.capitalize } is renting #{ sporting_good.title.capitalize } from you"
    else
      UNAVAILABLE
    end
  end

  def process_payment user
    binding.pry
    begin
      self.payment = payment(user)
    rescue Stripe::CardError => e
      self.fail!(error: e.json_body[:error])
    rescue Stripe::StripeError => e
      self.fail!(error: e.message)
    end
  end

  # validates methods
	def dates_are_vacant?
    rentals = self.sporting_good.rentals
		if rentals.between_range(self.start_date, self.end_date).any?
			errors.add(:error, I18n.t('rentals.dates_are_taken', item: self.sporting_good.title))
      return false
		end
    true
	end

  def dates_not_in_past?
    return true unless self.start_date.past?
    errors.add(:error, I18n.t('rentals.dates_in_past'))
    false
  end

  def dates_not_today?
    # Deal with rails being a day off
    start_date = self.start_date + 1
    return true unless start_date.today?
    errors.add(:error, I18n.t('rentals.cant_be_today'))
    false
  end

  def has_agreed_to_terms?
    return true if self.agreed_to_terms
    errors.add(:error, I18n.t('rentals.terms_not_agreed_to'))
    false
  end

  def not_past_days_limit?
    return true if (end_date.to_date - start_date.to_date).to_i <= DAYS_LIMIT
    errors.add(:error, I18n.t('rentals.exceeds_days_limit', { days: DAYS_LIMIT }))
    false
  end

  def wait_to_complete
    CompleteRentalJob.set(wait_until: self.end_date.tomorrow.noon).perform_later(self)
  end

	# =============
	# EMAIL ALERTS
	# =============

	def send_confirmation_email
		RentersConfirmationJob.perform_later self
    OwnersConfirmationJob.perform_later self
	end

  # NOTE Send a email when the rental has ended to Renter and Owner to rate their experience
  def send_rating_emails_when_ends
    RateRentalJob.set(wait_until: self.end_date.tomorrow.noon).perform_later(self)
    RateSportingGoodJob.set(wait_until: self.end_date.tomorrow.noon).perform_later(self)
  end

  private

  def payment user
    Stripe::Charge.create(
      amount: self.total,
      currency: "cnd",
      source: "card",
      customer: user.stripe_id,
      receipt_email: user.email,
      description: "#{ self.sporting_good.title } rental for #{ user.email }",
      statement_descriptor: "Equipt Rental Payment"
    )
  end

end
