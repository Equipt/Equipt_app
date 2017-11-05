class SportingGoodsSerializer < ActiveModel::Serializer

	attributes :category,
						:title,
						:brand,
						:model,
						:description,
						:age,
						:price_per_day,
						:price_per_week,
						:deposit,
						:slug,
						:primary_image

	def primary_image
		image = @object.images.find_by(primary: true)
		image = @object.images.first unless image
		image.file.url if image
	end

end
