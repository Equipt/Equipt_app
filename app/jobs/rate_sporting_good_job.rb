class RateSportingGoodJob < ApplicationJob

  queue_as :default

  def perform rental
    RentalMailer.rate_sporting_good( self ).deliver
  end

end
