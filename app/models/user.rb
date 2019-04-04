class User < ActiveRecord::Base

	acts_as_paranoid
	has_secure_password

	# hashable id
	include Friendlyable

	attr_accessor :notice, :api_key, :updating_password, :terms

	has_many :sporting_goods, dependent: :destroy
	has_many :rentals, -> { order("start_date desc") }, dependent: :destroy
	has_many :api_keys, dependent: :destroy
	has_many :ratings, :as => :rateable, dependent: :destroy
	has_many :owned_rentals, -> { order("start_date desc") }, :through => :sporting_goods, source: 'rentals'
	has_many :images, :as => :imageable, dependent: :destroy
	has_many :payment_methods

	has_one :address, :dependent => :destroy
	has_one :phone, :dependent => :destroy, autosave: false

	accepts_nested_attributes_for :address, allow_destroy: true
	accepts_nested_attributes_for :phone, allow_destroy: true

	validates_confirmation_of :password, if: :should_validate_password?
	validates :password, :length=>{ :minimum => 6 }, if: :should_validate_password?
	validates :password_confirmation, :length=>{ :minimum => 6 }, if: :should_validate_password?
	validate :agreed_to_terms

	validates_presence_of :firstname, :lastname, :email
	validates_email_format_of :email
	validates_uniqueness_of :email

	after_create :session_api_key
	after_update :session_api_key

	def generate_token(column)
  		begin
    		self[column] = SecureRandom.urlsafe_base64
  		end while User.exists?(column => self[column])
	end

	def session_api_key
  		api_keys.first_or_create
	end

	def agreed_to_terms
		if !self.terms
			errors.add(:terms, I18n.t('user.must_agree_to_terms'))
		end
	end

	# oAuth
	def self.from_facebook(auth)

		password = SecureRandom.hex(9)

  	where(provider: 'facebook', uid: auth['user_id']).first_or_initialize.tap do |user|

			user.provider = 'facebook'
			user.uid = auth['user_id']
			user.firstname ||= auth['name']
			user.lastname ||= auth['name']
    	user.email ||= auth['email']
			user.oauth_token = auth['access_token']
			user.oauth_expires_at = Time.at(auth['expires_in'])
    	user.password ||=  password
    	user.password_confirmation ||=  password
			user.terms = true
  		user.save!

			url = auth['picture']['data']['url']

			image = user.images.first_or_initialize
			image.url = url
			image.primary = true
			image.save!

		end

	end

 	# forgot password
	def send_password_reset
  	generate_token(:password_reset_token)
  	self.password_reset_sent_at = Time.zone.now
  	save! validate: false
  	UserMailer.password_reset(self).deliver
	end

	def should_validate_password?
		updating_password || new_record?
	end

	# user has completed contact info
	def verified?
		return true if phone && phone.verified && address && address.verified
		false
	end

	def coordinates
		if self.address
			{
				lat: self.address.latitude,
				lng: self.address.longitude
			}
		end
	end

	def overall_rating
		ratings.pluck(:rating).inject(&:+).to_f / ratings.size
	end

end
