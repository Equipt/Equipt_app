class Api::Owner::RentalsController < ApiController

    def index
        rentals = current_user.rentals | current_user.owned_rentals
        render json: rentals, include_sporting_good: true, status: 200
    end

    def destroy
        binding.remote_pry
    end

end
