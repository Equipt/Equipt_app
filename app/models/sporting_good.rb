class SportingGood < ActiveRecord::Base

	include AlgoliaSearch
	extend FriendlyId

	acts_as_paranoid

	attr_accessor :page, :per_page

	DAYS_IN_WEEK = 7

	scope :exclude_user, -> user { where.not(user_id: user.id) }
	scope :search_by_keyword, -> keyword { where("title LIKE ? OR brand LIKE ?", "%#{keyword}%", "%#{keyword}%") }
	scope :search, -> params { search_by_keyword(params[:keyword]) }

	belongs_to :user
	has_many :images, :as => :imageable, dependent: :destroy, after_add: :reindex_sporting_good, after_remove: :reindex_sporting_good
	has_many :rentals, dependent: :destroy, inverse_of: :sporting_good

	has_many :ratings, through: :rentals, after_add: :reindex_sporting_good, after_remove: :reindex_sporting_good

	accepts_nested_attributes_for :images

  friendly_id :title, use: :slugged

	validates_presence_of :category, :title, :brand, :model, :price_per_day
	validates :price_per_day, :price_per_week, :age, :numericality => { greater_than: 0 }
	validates :user, :presence => true
	validate :is_weekly_price_a_discount?

	before_save :set_deposits_default

	algoliasearch per_environment: true do
		add_attribute :primary_image
		add_attribute :overall_rating
		geoloc :lat, :lng
	end

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

	def is_weekly_price_a_discount?
		full_weekly_cost = self.price_per_day.to_i * DAYS_IN_WEEK
		if (self.price_per_week && ( self.price_per_week.to_i > full_weekly_cost))
			errors.add(:price_per_week, I18n.t('sporting_good.discount_error', price: full_weekly_cost))
		end
	end

	def set_deposits_default
		self.deposit = 0 if self.deposit.blank?
	end

	private

	def overall_rating
		self.ratings.pluck(:rating).inject(&:+).to_f / self.ratings.size
	end

	def primary_image
		image = self.images.find_by(primary: true)
		image = self.images.first unless image
		image.file.url if image
	end

	def lat
		self.user.address.latitude if self.user
	end

	def lng
		self.user.address.longitude if self.user
	end

	def reindex_sporting_good child
		self.index!
	end

end
