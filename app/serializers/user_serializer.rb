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
      :phone,
      :address


  def notice
		{ info: "Welcome, #{ @object.firstname.capitalize }" } if @instance_options[:create_notice]
    { info: "Welcome back, #{ @object.firstname.capitalize }"} if @instance_options[:session_notice]
  end

  def api_key
    @object.api_keys.first.access_token if @instance_options[:send_api_token]
  end

  def include_associations!
    include! :rentals unless @instance_options[:exclude_rentals]
  end

  private

  def phone
    @object.phone
  end

  def address
    @object.address
  end

end
