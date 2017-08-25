class SportingGood < ActiveRecord::Base

	belongs_to :user
	has_many :images, :as => :imageable, dependent: :destroy
	accepts_nested_attributes_for :images

	extend FriendlyId

  	friendly_id :title, use: :slugged

  	validates_presence_of :category, :title, :brand, :model

	def slug_candidates
  		[ :title,[:title,:id] ]
	end

	def store_images(images = [])

		excluded_image_ids = []

		images.each do |image|
			if image.instance_of?(String)
				excluded_image_ids << image 
			else
				excluded_image_ids << self.images.create(file: image).id
			end
		end

		self.images.where.not(id: excluded_image_ids).destroy_all

	end

end
