class HomeController < ApplicationController

	def index
		binding.pry
		# @current_user = {firstname: 'nick'}
		@sporting_goods = SportingGood.all
	end

end