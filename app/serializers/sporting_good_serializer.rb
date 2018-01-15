class SportingGoodSerializer < ActiveModel::Serializer

	attributes :category,
						:title,
						:brand,
						:model,
						:description,
						:age,
						:price_per_day,
						:price_per_week,
						:deposit,
						:errors,
						:slug,
						:images,
						:overall_rating,
						:total_ratings,
						:primary_image

	has_many :rentals
	has_many :ratings
	belongs_to :user, serializer: OwnerSerializer

	def include_rentals?
		@options[:exclude_rentals]
	end

	def images
		@object.images unless @instance_options[:exclude_images]
	end

	def include_associations!
		include! :rentals unless @instance_options[:exclude_rentals]
	end

end
