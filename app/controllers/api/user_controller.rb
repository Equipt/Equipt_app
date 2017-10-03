class Api::UserController < ApiController

	skip_before_action :verify_authenticity_token

	def create
		user = User.new(user_params)
		if user.save
			render json: user, send_api_token: true, status: 200
		else
			render json: user, send_api_token: false, status: 400
		end
	end

	def update
		binding.remote_pry
		if current_user.update(user_params)
			render json: current_user, send_api_token: true, status: 200
		else
			render json: current_user, send_api_token: false, status: 400
		end
	end

	private

	def user_params
		params[:user][:address_attributes] = params[:user][:address] if params[:user][:address]
		params[:user][:phone_attributes] = params[:user][:phone] if params[:user][:phone]
		params.require(:user).permit(
			:id,
			:username,
			:created_at,
			:updated_at,
			:firstname,
			:lastname,
			:email,
			:password,
			:password_confirmation,
			phone_attributes: [
				:number,
				:_destroy
			],
			address_attributes: [
				:unit,
				:number,
				:street,
				:city,
				:zip,
				:country,
				:lng,
				:lat,
				:_destroy
			]
		).permit!
	end

end
