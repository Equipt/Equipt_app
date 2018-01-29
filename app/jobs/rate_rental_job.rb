class RateRentalJob < ApplicationJob

  queue_as :default

  def perform rental
    RentalMailer.rate_rental( self ).deliver
  end

end
