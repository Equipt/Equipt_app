class SportingGood < ActiveRecord::Base

	scope :exclude_user, -> user { where.not(user_id: user.id) }
	scope :search_by_keyword, -> keyword { where("title LIKE ? OR brand LIKE ?", "%#{keyword}%", "%#{keyword}%") }
	scope :search, -> (params) { search_by_keyword(params[:keyword]) }

	belongs_to :user

	has_many :images, :as => :imageable, dependent: :destroy
	has_many :rentals, dependent: :destroy, inverse_of: :sporting_good

	accepts_nested_attributes_for :images

	extend FriendlyId

  	friendly_id :title, use: :slugged

	validates_presence_of :category, :title, :brand, :model

	def slug_candidates
  		[ :title,[:title,:id] ]
	end

	def store_images(images = [])

		excluded_image_ids = []
		images ||= []

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
