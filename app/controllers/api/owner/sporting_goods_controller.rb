class Api::Owner::SportingGoodsController < ApplicationController

	skip_before_action :verify_authenticity_token

	before_action :ensure_authenticated_user

	def new 

		sporting_good = current_user.sporting_goods.new
		render json: sporting_good,  status: 200

	end

	def create
		
		sporting_good = current_user.sporting_goods.new(sporting_good_params)

		if sporting_good.save
			render json: sporting_good, send_create_message: true, status: 200
		else
			render json: sporting_good, send_create_message: false, status: 400
		end

	end

	private

	def sporting_good_params
		params.require(:sporting_good).permit(:category, :title, :brand, :model, :description, :age, :price_per_day, :price_per_week, :deposit,  images_attributes: [:file, :primary])
	end

end