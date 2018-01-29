class RentalMailer < ApplicationMailer

	def renters_confirmation rental
		@owner = rental.sporting_good.user
		@renter = rental.user
  	mail :to => @renter.email, :subject => "You rented #{ rental.sporting_good.title } on #{ rental.start_date.strftime("%m/%d/%Y") }"
	end

  def owners_confirmation rental
		@owner = rental.sporting_good.user
		@renter = rental.user
    mail :to => @owner.email, :subject => "#{ @renter.firstname } has rented #{ rental.sporting_good.title } on #{ rental.start_date.strftime("%m/%d/%Y") }"
  end

	def rate_rental rental
		@owner = rental.sporting_good.user
		@renter = rental.user
		mail :to => @owner.email, :subject => "How was renting #{ rental.sporting_good.title } to #{ @renter.firstname }?"
	end

	def rate_sporting_good rental
		@rental = rental
		@sporting_good = rental.sporting_good
		@owner = rental.sporting_good.user
		@renter = rental.user
		mail :to => @renter.email, :subject => "How was renting #{ rental.sporting_good.title }?"
	end

end
