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
      :errors

	has_one :phone
	has_one :address

  def notice
		{ info: "Welcome, #{ @object.firstname.capitalize }" } if @instance_options[:create_notice]
    { info: "Welcome back, #{ @object.firstname.capitalize }"} if @instance_options[:session_notice]
		{ info: "You successfully updated your profile"} if @instance_options[:update_notice]
  end

  def api_key
    @object.api_keys.first.access_token if @instance_options[:send_api_token]
  end

  def include_associations!
    include! :rentals unless @instance_options[:exclude_rentals]
  end

end
