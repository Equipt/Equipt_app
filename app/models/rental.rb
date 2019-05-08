class Rental < ActiveRecord::Base

  UNAVAILABLE = 'unavailable'
  USING = 'using'
  RENTING = 'renting'
  OWNED = 'owned'
  DAYS_LIMIT = 14

  SERVICE_FEE_PERCENTAGE = 10

  acts_as_paranoid

  # hashable id
  include Friendlyable

  belongs_to :user
  belongs_to :sporting_good, inverse_of: :rentals

  delegate :user, to: :sporting_good, prefix: :owner, :allow_nil => true

  after_initialize :set_total_days, :set_rental_cost
  validate :dates_are_vacant?, :has_agreed_to_terms?, :dates_not_today?, :dates_not_in_past?, :not_past_days_limit?

  has_many :ratings, :as => :rateable, dependent: :destroy

  has_one :payment

  scope :between_range, -> (start_date, end_date) { where('(start_date, end_date) overlaps (timestamp :start_date, timestamp :end_date)',
    :start_date => start_date, :end_date => end_date) }

  after_save :wait_to_complete, :send_confirmation_email, :send_rating_emails_when_ends

  # NOTE Get the owner of the rental
  def owner
    OwnerSerializer.new(self.sporting_good.user)
  end

  def is_available?
    self.dates_are_vacant? && self.dates_not_today? && self.dates_not_in_past? && self.not_past_days_limit?
  end

  def reindex_sporting_good item = nil
    self.sporting_good.index!
  end

  def get_price
    self.set_total_days
    self.set_rental_cost
  end

  def set_total_days
		self.total_days = 1 if self.end_date == self.start_date
    self.total_days = (self.start_date - self.end_date).to_i.abs + 1
  end

  def set_rental_cost
    sporting_good = SportingGood.find(self.sporting_good_id)
    self.sub_total = (sporting_good.price_per_day * self.total_days).round(2)
    self.service_fee = ((self.sub_total / 100) * SERVICE_FEE_PERCENTAGE).round(2)
    self.total = (self.sub_total + self.service_fee).round(2)
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

  def process_payment(current_user, card)
    begin
      stripe_payment = payment(current_user, card)
      self.stripe_payment_id = stripe_payment.id
      self.save
    rescue Stripe::CardError => e
      errors.add(:error, e.json_body[:error][:message])
      return false
    rescue Stripe::StripeError => e
      errors.add(:error, e.message)
      return false
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
    return true unless self.start_date.today?
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

  def payment(user, card)

    if user.stripe_customer_id

      customer = Stripe::Customer.retrieve(user.stripe_customer_id)
      source = customer.sources.create({source: card[:id]})
      customer.default_source = source[:id]

    else

      customer = Stripe::Customer.create(
        email: user.email
      )

      customer.sources.create({ source: card[:id] })
      user.stripe_customer_id = customer.id
      user.save!(:validate => false)

    end

    Stripe::Charge.create(
      amount: (100 * self.total).to_i,
      currency: "cad",
      customer: user.stripe_customer_id,
      receipt_email: user.email,
      description: "#{ self.sporting_good.title } rental for #{ user.email }",
      statement_descriptor: "Equipt Rental Payment"
    )

  end

end
