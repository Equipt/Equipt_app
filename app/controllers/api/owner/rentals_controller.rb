class Api::Owner::RentalsController < ApiController

    def index
        rentals = current_user.owned_rentals
        render json: rentals, status: 200
    end

end
