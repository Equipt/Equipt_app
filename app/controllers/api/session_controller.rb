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

end
