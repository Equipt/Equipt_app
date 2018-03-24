class RateRentalJob < ApplicationJob

  queue_as :default

  def perform rental
    RentalMailer.rate_rental( rental ).deliver
  end

end
