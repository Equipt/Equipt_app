class Api::UserController < ApplicationController

	skip_before_action :verify_authenticity_token

	def create
		user = User.new(user_params)
		if user.save
			render json: user, send_api_token: true, status: 200
		else 
			render json: user, send_api_token: false, status: 400
		end
	end	

	private

	def user_params
		params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
	end

end