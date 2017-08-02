class SportingGood < ActiveRecord::Base

	belongs_to :user
	has_many :images, :as => :imageable, dependent: :destroy
	accepts_nested_attributes_for :images

	extend FriendlyId

  	friendly_id :title, use: :slugged

	def slug_candidates
  		[ :title,[:title,:id] ]
	end

end