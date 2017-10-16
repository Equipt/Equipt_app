class Phone < ApplicationRecord

  has_one :user, dependent: :destroy

  before_save :send_verification_pin, :if => :new_record?

  validates_presence_of :number

  # NOTE Verify is a real phone number
  def send_verification_pin
    twillio = TwilioService.new
    self.pin = twillio.generate_pin
    self.verifying = true
    self.verified = false
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
