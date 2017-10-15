class Api::UserController < ApiController

	skip_before_action :verify_authenticity_token

	def create
		user = User.new(user_params)
		if user.save
			render json: user, create_notice: true, send_api_token: true, status: 200
		else
			render json: user, send_api_token: false, status: 400
		end
	end

	def update
		if current_user.update_attributes(user_params)
			render json: current_user, update_notice: true, send_api_token: true, status: 200
		else
			render json: current_user, send_api_token: false, status: 400
		end
	end

	def destroy
		firstname = current_user.firstname
		if current_user.destroy
			render json: { error: I18n.t('user.deleted', name: firstname) }, status: 200
		end
	end

	private

	def user_params
		params[:user][:address_attributes] = params[:user].delete(:address) if params[:user][:address]
		params[:user][:phone_attributes] = params[:user].delete(:phone) if params[:user][:phone]
		params[:user].delete(:errors) if params[:user][:errors]
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
			:notice,
			:api_key,
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
		)
	end

end
