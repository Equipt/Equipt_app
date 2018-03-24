class Api::Owner::RentalsController < ApiController

    def index
        rentals = current_user.rentals | current_user.owned_rentals
        render json: rentals, include_sporting_good: true, status: 200
    end

    # NOTE: When owner wants to use their own sporting_good
    def create
      rental = sporting_goods.rentals.new(rental_params)
      rental.user_id = current_user.id
      if rental.save
        render json: rental, status: 200
      else
        render json: rental, status: 400
      end
    end

    def show
      rental = sporting_goods.rentals.find_by_hash_id(params[:id])
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

    protected

    def rental_params
      # Force agreed_to_terms as this is not an actual rental
      params[:rental][:agreed_to_terms] = true
      params.require(:rental).permit(:start_date, :end_date, :agreed_to_terms)
    end

    def sporting_goods
      current_user.sporting_goods.find_by_slug(params[:sporting_good_slug])
    end

end
