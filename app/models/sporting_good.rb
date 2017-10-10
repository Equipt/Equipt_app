class SportingGood < ActiveRecord::Base

	DAYS_IN_WEEK = 7

	scope :exclude_user, -> user { where.not(user_id: user.id) }
	scope :search_by_keyword, -> keyword { where("title LIKE ? OR brand LIKE ?", "%#{keyword}%", "%#{keyword}%") }
	scope :search, -> (params) { search_by_keyword(params[:keyword]) }

	belongs_to :user
	has_many :images, :as => :imageable, dependent: :destroy
	has_many :rentals, dependent: :destroy, inverse_of: :sporting_good

	accepts_nested_attributes_for :images

	extend FriendlyId

  friendly_id :title, use: :slugged

	validates_presence_of :category, :title, :brand, :model, :price_per_day
	validates :price_per_day, :price_per_week, :age, :numericality => { greater_than: 0 }
	validate :weekly_price_is_a_discount

	before_save :set_deposits_default

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

	def weekly_price_is_a_discount

		full_weekly_cost = self.price_per_day.to_i * DAYS_IN_WEEK

		if (self.price_per_week && ( self.price_per_week.to_i > full_weekly_cost))
			errors.add(:price_per_week, I18n.t('sporting_good.discount_error', price: full_weekly_cost))
		end
		
	end

	def set_deposits_default
		self.deposit = 0 if self.deposit.blank?
	end

end
