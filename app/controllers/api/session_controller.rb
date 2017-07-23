class Api::SessionController < ApplicationController

	protect_from_forgery with: :null_session

	def create
		user = User.find_by_email(params[:email])
		if user && user.authenticate(params[:password])
			render json: user, session_notice: true, send_api_token: true, status: 200
		else 
			render json: [{ error: "Incorrect credentials, try again!" }], status: 400
		end
	end

	def facebook_auth
		user = User.from_facebook(params)
		render json: user, send_api_token: true, status: 200
	end

	def forgot_password
		user = User.find_by_email(params['email'])
		user.send_password_reset if user
		render json: [{ info: "A password reset link has been sent your email!" }], status: 200
	end

	def reset_password
  		user = User.find_by(password_reset_token: params[:reset_token])
  		user.password = params[:password]
  		user.password_confirmation = params[:password_confirmation]
  		user.password_reset_token = nil
    	user.password_reset_sent_at = nil
  		if user.save
  			render json: [{ info: "Your password has been reset!" }], status: 200
  		else
  			render json: user.errors, status: 400
  		end
	end

end
