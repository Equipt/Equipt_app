class TwilioService

  attr_reader :client

  PIN_LENGTH = 4

  def initialize
    @client = Twilio::REST::Client.new(ENV['TWILIO_TOKEN'], ENV['TWILIO_SID'])
  end

  def send_pin phone_number, pin
    self.client.messages.create(
      from: ENV['TWILIO_PHONE'],
      to: phone_number,
      body: I18n.t('user.phone_verification', pin: pin)
    )
  end

  def generate_pin
    rand(0000..9999).to_s.rjust(PIN_LENGTH, "0")
  end

end
