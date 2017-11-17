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
						:primary_image,
						:overall_rating

end
