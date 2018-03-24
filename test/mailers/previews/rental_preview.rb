class RentalPreview < ActionMailer::Preview

  def renters_confirmation
    RentalMailer.renters_confirmation(Rental.last)
  end

  def owners_confirmation
    RentalMailer.owners_confirmation(Rental.last)
  end

  def rate_rental
    RentalMailer.rate_rental(Rental.last)
  end

  def rate_sporting_good
    RentalMailer.rate_sporting_good(Rental.last)
  end

end
