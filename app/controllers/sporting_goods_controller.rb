class SportingGoodsController < ApplicationController

	def index
		@sporting_goods = SportingGood.all
	end

	def show
		@sporting_good = SportingGood.find_by_slug params[:slug] 
	end

end