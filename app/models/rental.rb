class Rental < ActiveRecord::Base

  acts_as_paranoid

  # hashable id
  include Friendlyable

  belongs_to :user
  belongs_to :sporting_good, inverse_of: :rentals

  before_save :set_total_days, :set_rental_cost
  validate :dates_are_vacant?, :has_agreed_to_terms, :dates_not_today?, :dates_not_in_past?

  # after_save :send_confirmation_email, if: :rental_confirmed_changed?
  # after_create :send_create_emails
  # after_destroy :send_destroy_email

  # TODO change database to sql and update this to use the built in overlap function overlap
  @@dates_taken_sql = "(start BETWEEN ? AND ? OR end BETWEEN ? AND ?) OR (start <= ? AND end >= ?)";

    # validates methods
	def dates_are_vacant?
    rentals = self.sporting_good.rentals
		if (self.start? || self.end?)
			if rentals.where(@@dates_taken_sql, self.start, self.end, self.start, self.end, self.start, self.end).any?
				errors.add(:error, I18n.t('rentals.dates_are_taken', item: self.sporting_good.title))
        return false
			end
		end
    true
	end

  def dates_not_in_past?
    return true unless self.start.past?
    errors.add(:error, I18n.t('rentals.dates_in_past'))
    false
  end

  def dates_not_today?
    return true unless self.start.today?
    errors.add(:error, I18n.t('rentals.cant_be_today'))
    false
  end

  def has_agreed_to_terms
    return true if self.agreed_to_terms
    errors.add(:error, I18n.t('rentals.terms_not_agreed_to'))
    false
  end

  def is_available?
    dates_are_vacant? && dates_not_today? && dates_not_in_past?
  end

	# before create methods

	def set_total_days
		self.total_days = (self.start - self.end).to_i.abs
	end

	def set_rental_cost
		sporting_good = SportingGood.find(self.sporting_good_id)
		self.sub_total = sporting_good.price_per_day * self.total_days
		self.total   = self.sub_total + sporting_good.deposit
		self.deposit = sporting_good.deposit
	end

	# =============
	# EMAIL ALERTS
	# =============

	# def send_create_emails
	# 	RentalMailer.needs_confirmation( self ).deliver
	# 	RentalMailer.waiting_on_owners_confirmation( self ).deliver
	# end
    #
	# def send_destroy_email
	# 	RentalMailer.rental_destroyed( self ).deliver
	# end
    #
	# def send_confirmation_email
	# 	RentalMailer.owner_confirmed( self ).deliver if self.rental_confirmed
	# end

end
