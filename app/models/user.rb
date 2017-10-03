class User < ActiveRecord::Base

	attr_accessor :notice, :api_key, :phone, :address, :errors

	has_secure_password

	has_many :sporting_goods, dependent: :destroy
	has_many :rentals, dependent: :destroy
	has_many :api_keys, dependent: :destroy
	has_many :owned_rentals, :through => :sporting_goods, source: 'rentals'

	has_one :address
	has_one :phone

	accepts_nested_attributes_for :address
	accepts_nested_attributes_for :phone

	validates_presence_of :firstname, :lastname, :email
	validates_email_format_of :email
	validates_uniqueness_of :email
	validates :password, :length=>{ :minimum => 6 }

	after_create :session_api_key

	def generate_token(column)
  		begin
    		self[column] = SecureRandom.urlsafe_base64
  		end while User.exists?(column => self[column])
	end

	def session_api_key
  		api_keys.first_or_create
	end

	# oAuth
	def self.from_facebook(auth)

		password = SecureRandom.hex(9)

    	where(provider: 'facebook', uid: auth['user_id']).first_or_initialize.tap do |user|
  			user.provider           	= 'facebook'
  			user.uid                	= auth['user_id']
  			user.firstname          	= auth['name']
  			user.lastname          		= auth['name']
      		user.email              	= auth['email']
  			user.oauth_token        	= auth['access_token']
  			user.oauth_expires_at   	= Time.at(auth['expires_in'])
      		user.password              ||=  password
      		user.password_confirmation ||=  password
	  		user.save!
		end
	end

	 # forgot password
  	def send_password_reset
    	generate_token(:password_reset_token)
    	self.password_reset_sent_at = Time.zone.now
    	save! validate: false
    	UserMailer.password_reset(self).deliver
  	end

end
