class CompleteRentalJob < ApplicationJob

  queue_as :default

  def perform rental
    rental.update_attribute(complete: true)
  end

end
