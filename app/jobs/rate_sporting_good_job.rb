class RateSportingGoodJob < ApplicationJob

  queue_as :default

  def perform rental
    RentalMailer.rate_sporting_good( rental ).deliver
  end

end
