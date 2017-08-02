class Image < ActiveRecord::Base

	belongs_to :imageable, :polymorphic => true

	mount_uploader :file, ImagesUploader

	before_create :check_file 

	private

	def check_file
		binding.pry 
	end

end