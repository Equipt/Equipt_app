class SportingGoodSerializer < ApplicationSerializer

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
						:primary_image,
						:coordinates

	has_many :rentals
	has_many :ratings, serializer: RatingSerializer
	belongs_to :user, serializer: SimpleOwnerSerializer

	def include_rentals?
		@options[:exclude_rentals]
	end

	def coordinates
		{
			latitude: @object.user.address.latitude,
			longitude: @object.user.address.longitude
		}
	end

	def images
		@object.images unless @instance_options[:exclude_images]
	end

	def include_associations!
		include! :rentals unless @instance_options[:exclude_rentals]
	end

end
