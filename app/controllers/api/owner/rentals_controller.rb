class Api::Owner::RentalsController < ApiController

    def index
        rentals = current_user.rentals | current_user.owned_rentals
        render json: rentals, include_sporting_good: true, status: 200
    end

    def show
      rental = current_user.sporting_goods.find_by_slug(params[:sporting_good_slug]).rentals.find_by_hash_id(params[:id])
      if rental
        render json: rental, status: 200
      else
        render json: rental, status: 404
      end
    end

    def destroy
        rental = current_user.owned_rentals.find_by_hash_id(params[:hash_id])
        if rental.destroy
          render json: { info: I18n.t('rentals.cancel_success') }, status: 200
        else
          render json: { error: I18n.t('rentals.cancel_error') }, status: 400
        end
    end

end
