class SportingGoodSerializer < ActiveModel::Serializer

	attributes 	:category,
				:title,
				:brand,
				:model,
				:description,
				:age,
				:price_per_day,
				:price_per_week,
				:deposit,
				:errors,
				:slug

	has_many :images
	has_many :rentals

	belongs_to :user

	def include_associations!
		include! :rentals unless @instance_options[:exclude_rentals]
		include! :images unless @instance_options[:exclude_images]
	end

end
