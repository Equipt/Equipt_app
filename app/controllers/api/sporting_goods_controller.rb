class Api::SportingGoodsController < ApiController

	def index
		sporting_goods = SportingGood.exclude_user(current_user).search(params).paginate(pagination_params)
		render json: { sporting_goods: ActiveModel::Serializer::CollectionSerializer.new(sporting_goods, serializer: SportingGoodsSerializer),
									 total: SportingGood.count
									}, status: 200
	end

	def show
		sporting_good = SportingGood.find_by_slug(params[:slug])
		if sporting_good
			render json: sporting_good, exclude_rentals: false, status: 200
		else
			render json: { error: I18n.t('errors.not_found', item: params[:slug]) }, status: 404
		end
	end

	private

	def pagination_params
		params[:per_page] ||= SportingGood.count
		{ page: params[:page], per_page: params[:per_page] }
	end

	def sporting_good_params
		params.require(:sporting_good).permit(
			:category,
			:title,
			:brand,
			:model,
			:description,
			:age,
			:price_per_day,
			:price_per_week,
			:deposit,
			:image_attributes,
			:page,
			:per_page
		)
	end

end
