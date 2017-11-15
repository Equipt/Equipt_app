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
						:overall_rating

	has_many :rentals
	has_many :ratings
	belongs_to :user

	def include_rentals?
		@options[:exclude_rentals]
	end

	def images
		@object.images unless @instance_options[:exclude_images]
	end

	def include_associations!
			include! :rentals unless @instance_options[:exclude_rentals]
	end

	def overall_rating
		@object.ratings.pluck(:score).inject(&:+).to_f / @object.ratings.size
	end

end
