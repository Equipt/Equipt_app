class HomeController < ApplicationController

	def index
		@content = I18n.t('frontend')
	end

end
