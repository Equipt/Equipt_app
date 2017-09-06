class Api::Owner::RentalsController < ApiController

    def index
        rentals = current_user.rentals
        render json: rentals, include_sporting_good: true, status: 200
    end

end
