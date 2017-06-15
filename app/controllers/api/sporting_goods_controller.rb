class Api::SportingGoodsController < ApplicationController

	before_action :ensure_authenticated_user

	def index
		sporting_goods = SportingGood.all
		render json: sporting_goods, status: 200
	end

end