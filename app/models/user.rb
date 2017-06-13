class User < ActiveRecord::Base

	has_secure_password

	validates :email, confirmation: true
  	validates :email_confirmation, presence: true

  	has_many :sporting_goods

  	has_many :api_keys, dependent: :destroy

  	after_create :session_api_key

  	def generate_token(column)
    	begin
      		self[column] = SecureRandom.urlsafe_base64
    	end while User.exists?(column => self[column])
  	end

  	def session_api_key
    	api_keys.first_or_create
  	end

end