class Api::RentalsController < ApiController

    before_action :ensure_authenticated_user
    before_action :verified_user, only: [:create, :destroy]

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

    def destroy
        rental = current_user.rentals.find_by_hash_id(params[:hash_id])
        if rental.destroy
            render json: { info: I18n.t('rentals.cancel_success') }, status: 200
        else
            render json: { error: I18n.t('rentals.cancel_error') }, status: 400
        end
    end

    private

    def rental_params
        params.require(:rental).permit(:start, :end, :pick_up_time, :agreed_to_terms)
    end

end
