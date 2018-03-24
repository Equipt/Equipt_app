class RentersConfirmationJob < ApplicationJob

  queue_as :default

  def perform rental
    RentalMailer.renters_confirmation( rental ).deliver
  end

end
