class Address < ApplicationRecord

  has_one :user, dependent: :destroy

  before_validation :geocode, :unless => :verified

  validates_presence_of :number, :street, :city, :state, :zip, :country

  validate :real_address? unless :skip_geocoded_valiation

  geocoded_by :full_address do |address, results|
    if results.present?
      address.latitude = results.first.latitude
      address.longitude = results.first.longitude
      address.verified = true
    end
  end

  def real_address?
    if latitude.blank? || longitude.blank?
      errors.add(:address, "We couldn't find the address")
      return false
    end
    true
  end

  def full_address
    [number, street, city, state, zip, country].join(',')
  end

end
