class HomeController < ApplicationController

	def index
		@sporting_goods = SportingGood.all
	end

end