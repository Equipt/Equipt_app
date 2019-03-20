class Phone < ApplicationRecord

  attr_accessor :old_number

  has_one :user, dependent: :destroy

  before_save :send_verification_pin, :if => :number_changed?

  validates_presence_of :number

  # NOTE Verify is a real phone number
  def send_verification_pin
    twillio = TwilioService.new
    self.pin = twillio.generate_pin
    self.verifying = true
    self.verified = false
		puts "PIN NUMBER: #{self.pin}"
		twillio.send_pin( self.number, self.pin )
  end

  def verify_pin pin
    if self.pin.to_s === pin.to_s
      self.verifying = false
      self.verified = true
      return save!
    end
    false
  end

end
