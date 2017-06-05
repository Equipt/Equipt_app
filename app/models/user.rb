class User < ActiveRecord::Base

	has_secure_password

	validates :email, confirmation: true
  	validates :email_confirmation, presence: true

  	has_many :sporting_goods

end