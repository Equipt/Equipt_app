class OwnersConfirmationJob < ApplicationJob

  queue_as :default

  def perform rental
    RentalMailer.owners_confirmation( rental ).deliver
  end

end
