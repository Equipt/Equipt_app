class Rental < ActiveRecord::Base

  RENTALS_LIMIT = 3

  acts_as_paranoid

  # hashable id
  include Friendlyable

  belongs_to :user
  belongs_to :sporting_good, inverse_of: :rentals

  delegate :user, to: :sporting_good, prefix: :owner, :allow_nil => true

  before_save :set_total_days, :set_rental_cost
  validate :dates_are_vacant?, :has_agreed_to_terms?, :dates_not_today?, :dates_not_in_past?

  has_many :ratings, :as => :rateable, dependent: :destroy

  scope :between_range, -> (start_date, end_date) { where('(start_date, end_date) overlaps (timestamp :start_date, timestamp :end_date)',
    :start_date => start_date, :end_date => end_date) }

  after_save :wait_to_complete, :send_confirmation_email, :send_rating_emails_when_ends

  # NOTE Get the owner of the rental
  def owner
    OwnerSerializer.new(self.sporting_good.user)
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
    return true unless self.start_date.today?
    errors.add(:error, I18n.t('rentals.cant_be_today'))
    false
  end

  def has_agreed_to_terms?
    return true if self.agreed_to_terms
    errors.add(:error, I18n.t('rentals.terms_not_agreed_to'))
    false
  end

  def is_available?
    dates_are_vacant? && dates_not_today? && dates_not_in_past?
  end

	# before create methods

	def set_total_days
		self.total_days = (self.start_date - self.end_date).to_i.abs + 1
	end

	def set_rental_cost
		sporting_good = SportingGood.find(self.sporting_good_id)
		self.sub_total = sporting_good.price_per_day * self.total_days
		self.total = self.sub_total
		self.deposit = sporting_good.deposit
	end

  def reindex_sporting_good item = nil
    self.sporting_good.index!
  end

  def wait_to_complete
    CompleteRentalJob.set(wait_until: self.end_date.tomorrow.noon).perform_later(self)
  end

	# =============
	# EMAIL ALERTS
	# =============

	def send_confirmation_email
		RentalMailer.renters_confirmation( self ).deliver
    # RentalMailer.owners_confirmation( self ).deliver
	end

  # NOTE Send a email when the rental has ended to Renter and Owner to rate their experience
  def send_rating_emails_when_ends
    RateRentalJob.set(wait_until: self.end_date.tomorrow.noon).perform_later(self)
    RateSportingGoodJob.set(wait_until: self.end_date.tomorrow.noon).perform_later(self)
  end

end
