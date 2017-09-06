class Api::RentalsController < ApiController

    before_action :ensure_authenticated_user

    def create
        sporting_good = SportingGood.find_by_slug(params[:sporting_good_slug])
        rental = sporting_good.rentals.new(rental_params)
        rental.user_id = current_user.id
        if rental.save
            render json: rental, status: 200
        else
            render json: rental, status: 400
        end

    end

    private

    def rental_params
        params.require(:rental).permit(:start, :end, :pick_up_time, :agreed_to_terms)
    end

end
