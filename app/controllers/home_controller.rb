class HomeController < ApplicationController

	before_filter :basic_authenticate, :if => "Rails.env.staging?"

	def index
		@content = I18n.t('frontend')
	end

	private

	def basic_authenticate
		authenticate_or_request_with_http_basic 'Staging' do |name, password|
      name == ENV['BASIC_USERNAME'] && password == ['BASIC_PASSWORD']
    end
	end

end
