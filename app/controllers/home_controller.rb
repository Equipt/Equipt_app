class HomeController < ApplicationController

	def index
		# @current_user = {firstname: 'nick'}
		@sporting_goods = SportingGood.all
	end

end