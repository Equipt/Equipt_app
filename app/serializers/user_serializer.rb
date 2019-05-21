class UserSerializer < ApplicationSerializer

	attributes :id,
			:hash_id,
			:firstname,
			:lastname,
			:email,
			:username,
			:created_at,
			:updated_at,
      :api_key,
      :errors,
			:rentals,
			:notify_by_sms,
			:notify_by_email,
			:isVerified,
			:coordinates,
			:profile,
			:ratings,
			:phone,
			:address,
			:notice,
			:stripe_customer_id,
			:only_facebook_authenticated

	has_many :rentals

	def phone
		@object.phone || {}
	end

	def address
		@object.address || {}
	end

  def notice
		return { info: "Welcome, #{ @object.firstname.capitalize }" } if @instance_options[:create_notice]
    return { info: "Welcome back, #{ @object.firstname.capitalize }"} if @instance_options[:session_notice]
		return { info: "You successfully updated your profile"} if @instance_options[:update_notice]
		return { info: "#{ @object.phone.number } has been verified" } if @instance_options[:verify_notice]
  end

  def api_key
    @object.api_keys.first.access_token if @instance_options[:send_api_token]
  end

  def rentals
		if @instance_options[:include_rentals]
			rentalIds = current_user.rentals.pluck(:id)
			ownedRentalIds = current_user.owned_rentals.pluck(:id)
			ids = rentalIds + ownedRentalIds
			Rental.where(id: ids).order(:start_date)
		end
  end

	def isVerified
		@object.address.present? && @object.address.verified && @object.phone.present? && @object.phone.verified
	end

	def profile
		@object.images.first.url if @object.images.first
	end

	def ratings
		ActiveModel::Serializer::CollectionSerializer.new( @object.ratings | @object.owned_rentals.map(&:ratings).flatten, each_serializer: RatingSerializer)
	end

	def only_facebook_authenticated
		@object.provider == 'facebook' && @object.password == nil
	end

end
