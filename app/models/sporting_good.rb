class SportingGood < ActiveRecord::Base

	belongs_to :user
	
	extend FriendlyId
  	
  	friendly_id :title, use: :slugged

  	def slug_candidates
    	[ :title,[:title,:id] ]
  	end

end