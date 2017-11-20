class UserSerializer < ActiveModel::Serializer

	attributes :id,
			:firstname,
			:lastname,
			:email,
			:username,
			:created_at,
			:updated_at,
			:notice,
      :api_key,
      :errors,
			:rentals,
			:notify_by_sms,
			:notify_by_email,
			:isVerified,
			:coordinates

	has_one :phone
	has_one :address
	has_many :rentals

  def notice
		{ info: "Welcome, #{ @object.firstname.capitalize }" } if @instance_options[:create_notice]
    { info: "Welcome back, #{ @object.firstname.capitalize }"} if @instance_options[:session_notice]
		{ info: "You successfully updated your profile"} if @instance_options[:update_notice]
  end

  def api_key
    @object.api_keys.first.access_token if @instance_options[:send_api_token]
  end

  def rentals
  	current_user.rentals | current_user.owned_rentals if @instance_options[:include_rentals]
  end

	def isVerified
		@object.address.present? && @object.address.verified && @object.phone.present? && @object.phone.verified
	end

end
