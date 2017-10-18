class Api::SessionController < ApiController

	protect_from_forgery with: :null_session

	before_action :ensure_authenticated_user, only: [:fetch_user]

	def create
		user = User.find_by_email(params[:email])
		if user && user.authenticate(params[:password])
			render json: user, session_notice: true, send_api_token: true, status: 200
		else
			render json: { error: I18n.t('session.incorrect_credentials') }, status: 400
		end
	end

	def fetch_user
		render json: current_user, include_rentals: true, send_api_token: true, status: 200
	end

	def facebook_auth
		user = User.from_facebook(params)
		render json: user, send_api_token: true, status: 200
	end

	def forgot_password
		user = User.find_by_email(params['email'])
		user.send_password_reset if user
		render json: { info: I18n.t('session.sent_password_reset') }, status: 200
	end

	def reset_password
  		user = User.find_by(password_reset_token: params[:reset_token])
  		if user.password_reset_sent_at < 2.hours.ago
  			render json: { error: I18n.t('session.reset_expired') }, status: 400
  		elsif user.update_attributes user_params
  			render json: { info: I18n.t('session.password_reset') }, status: 200
  		else
  			render json: user.errors, status: 400
  		end
	end

	private

  	def user_params
    	params.require(:user).permit(:password, :password_confirmation)
  	end

end
