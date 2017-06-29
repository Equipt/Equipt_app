class User < ActiveRecord::Base

	has_secure_password

	has_many :sporting_goods

	has_many :api_keys, dependent: :destroy

	validates_presence_of :firstname, :lastname, :email

	validates_email_format_of :email

	validates_uniqueness_of :email

	validates :password,:presence=>true,:length=>{:minimum=>6},:on=>:create

	validates :password_confirmation, 
            :presence=>true, :if => :password_digest_changed?

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