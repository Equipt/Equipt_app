require 'pry-remote'

class Api::Owner::SportingGoodsController < ApiController

	skip_before_action :verify_authenticity_token

	before_action :ensure_authenticated_user

	def index
		sporting_goods = current_user.sporting_goods.search(params)
		render json: sporting_goods, status: 200
	end

	def new
		sporting_good = current_user.sporting_goods.new
		render json: sporting_good, status: 200
	end

	def create
		sporting_good = current_user.sporting_goods.new(sporting_good_params)
		if sporting_good.save
			sporting_good.store_images params[:sporting_good][:images_attributes]
			render json: sporting_good, send_create_message: true, status: 200
		else
			render json: sporting_good, send_create_message: false, status: 400
		end
	end

	def edit
		sporting_good = current_user.sporting_goods.find_by_slug(params[:slug])
		render json: sporting_good, status: 200
	end

	def update
		sporting_good = current_user.sporting_goods.find_by_slug(params[:slug])
		if sporting_good.update(sporting_good_params)
			sporting_good.store_images params[:sporting_good][:images_attributes]
			render json: sporting_good, send_updated_message: true, status: 200
		else
			render json: sporting_good, send_updated_message: false, status: 400
		end
	end

	def destroy
		sporting_good = current_user.sporting_goods.find_by_slug(params[:slug])
		render json: { info: I18n.t('sporting_good.deleted', item: sporting_good.title) }, status: 200 if sporting_good.destroy
	end

	private

	def sporting_good_params
		params.require(:sporting_good).permit(:category, :title, :brand, :model, :description, :age, :price_per_day, :price_per_week, :deposit, :errors, :image_attributes)
	end

end
