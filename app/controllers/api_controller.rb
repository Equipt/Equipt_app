class ApiController < ApplicationController

	protect_from_forgery with: :null_session

	skip_before_action :verify_authenticity_token

	serialization_scope :current_user

	#returns the active user associated with the access token
	def current_user
		api_key = ApiKey.where(access_token: token).first
		if api_key
			return api_key.user
		else
			return nil
		end
	end

	# NOTE returns error if user has no address and phone
	def is_current_user_verified?
		return true if current_user.verified?
		render json: { error: I18n.t('user.not_verified') }, status: 403
		false
	end

	protected

	# gets token from headers
	def token
		bearer = request.headers['HTTP_AUTHORIZATION']
		bearer ||= request.headers['rack.session'].try(:[], 'Authorization')
		if bearer.present?
			return bearer.split.last
		else
			return nil
		end
	end

	#render 401 status if user is not authorized
	def ensure_authenticated_user
		head :unauthorized unless current_user
	end

	#ensure current_user has verified contact details
	def verified_user
		render json: { error: I18n.t('user.not_verified') }, status: 400 unless current_user.verified?
	end

end
