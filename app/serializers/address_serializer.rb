class AddressSerializer < ActiveModel::Serializer

  attributes :unit,
            :number,
            :street,
            :city,
            :state,
            :zip,
            :country,
            :latitude,
            :longitude,
            :verified,
            :errors

end
