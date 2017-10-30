class Address < ApplicationRecord

  has_one :user, dependent: :destroy

  before_validation :geocode, :unless => :verified  

  validates_presence_of :number, :street, :city, :state, :zip, :country

  validate :found_address_presence

  geocoded_by :full_address do |address, results|
    if results.present?
     address.latitude = results.first.latitude
     address.longitude = results.first.longitude
     address.verified = true
    else
     address.latitude = nil
     address.longitude = nil
    end
  end

  def found_address_presence
    if latitude.blank? || longitude.blank?
      errors.add(:address, "We couldn't find the address")
    end
  end

  def full_address
    [number, street, city, state, zip, country].join(',')
  end

end
