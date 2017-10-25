class HomeController < ApplicationController

	before_filter :basic_authenticate, :if => "Rails.env.staging?"

	def index
		@content = I18n.t('frontend')
	end

	protected

	def basic_authenticate
		unless ENV['STAGING_AUTH'].blank?
			authenticate_or_request_with_http_digest do |username, password|
				ENV['STAGING_AUTH'].split(';').any? do |pair|
						[username, password] == pair.split(':')
				end
	    end
		end
	end

end
