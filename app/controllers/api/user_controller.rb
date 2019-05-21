class Api::UserController < ApiController

	protect_from_forgery with: :null_session
	skip_before_action :ensure_authenticated_user, only: [:create]

	def create
		user = User.new(user_params)
		if user.save
			render json: user, create_notice: true, send_api_token: true, status: 200
		else
			render json: user, send_api_token: false, status: 400
		end
	end

	def update
		user = current_user
		if user.update_attributes(user_params)
			render json: user, update_notice: true, send_api_token: true, status: 200
		else
			render json: user, send_api_token: true, status: 400
		end
	end

	def destroy
		firstname = current_user.firstname
		if current_user.destroy
			render json: { error: I18n.t('user.deleted', name: firstname) }, status: 200
		end
	end

	def basic_update
		user = current_user
		if user.update_attributes(basic_params)
			render json: user, update_notice: true, send_api_token: true, status: 200
		else
			render json: user, send_api_token: true, status: 400
		end
	end

	def password_update
		user = current_user
		if !user.authenticate(params[:password]) && !user.facebook_authenticated?
			render json: { error: I18n.t('user.incorrect_password') }, status: 400
		elsif user.update_attributes(password_update_params)
			render json: { error: I18n.t('user.updated_password') }, status: 200
		else 
			render json: { error: user.errors.full_messages }, status: 400
		end
	end

	private

	def basic_params
		params.require(:user).permit(
			:firstname,
			:lastname,
			:email
		)
	end

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
			:notify_by_sms,
			:notify_by_email,
			:terms,
			phone_attributes: [
				:number,
				:old_number,
				:_destroy
			],
			address_attributes: [
				:unit,
				:number,
				:street,
				:city,
				:state,
				:zip,
				:country,
				:lng,
				:lat,
				:_destroy
			]
		)
	end

	def password_update_params
		{
			password: params[:new_password],
			password_confirmation: params[:new_password_confirmation],
			terms: true
		}
	end

end
