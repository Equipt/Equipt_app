class RentalMailer < ApplicationMailer

	def renters_confirmation rental
	   @user = rental.user
     mail :to => @user.email, :subject => "Password Reset"
	end

  def owners_confirmation rental
    @user = rental.sporting_good.user
    mail :to => @user.email, :subject => "Password Reset"
  end

end
