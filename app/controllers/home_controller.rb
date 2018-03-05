class HomeController < ApplicationController

	before_filter :basic_authenticate, :if => "Rails.env.staging?"

	def index
		@content = I18n.t('frontend')
		@images = Dir.glob("app/assets/images/*")
	end

	private

	def basic_authenticate
		authenticate_or_request_with_http_basic 'Staging' do |name, password|
      name == 'tom' && 'password'
    end
	end

end
