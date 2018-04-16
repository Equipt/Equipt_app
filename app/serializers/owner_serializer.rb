class OwnerSerializer < ApplicationSerializer

  attributes :hash_id,
             :firstname,
             :lastname,
             :email,
             :unit,
             :street_number,
             :street,
             :city,
             :state,
             :country,
             :zip,
             :coordinates,
             :phone,
             :profile

  def unit
    @object.address.unit if @object.address
  end

  def street_number
    @object.address.number if @object.address
  end

  def street
    @object.address.street if @object.address
  end

  def city
    @object.address.city if @object.address
  end

  def state
    @object.address.state if @object.address
  end

  def zip
    @object.address.zip if @object.address
  end

  def country
    @object.address.country if @object.address
  end

  def phone
    @object.phone.number if @object.phone
  end

  def lat
    @object.address.lat if @object.address
  end

  def lng
    @object.address.lng if @object.address
  end

  def profile
    return @object.images.first.url if @object.images.first

  end

end
