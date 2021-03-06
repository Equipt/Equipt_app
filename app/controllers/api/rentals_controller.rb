class Api::RentalsController < ApiController

    RENTALS_LIMIT_PER_USER = 5

    before_action :verified_user, only: [:create, :destroy]
    before_action :is_current_user_verified?, only: :create

    def create
      sporting_good = SportingGood.find_by_slug(params[:sporting_good_slug])
      rental = sporting_good.rentals.new(rental_params)
      rental.user_id = current_user.id
      if rental.process_payment(current_user, params[:card])
        render json: rental, status: 200
      else
        render json: rental, status: 400
      end
    end

    def show
      rental = current_user.rentals.find_by_hash_id(params[:hash_id])
      if rental
        render json: rental, include_owner: true, status: 200
      else
        render json: { error: I18n.t('rentals.not_found') }, status: 404
      end
    end

    def cancel
      rental = current_user.rentals.find_by_hash_id(params[:hash_id])
      rental.cancel_reason = params[:reason]
      rental.cancel_message = params[:comment]
      if rental.save(validate: false) && rental.cancel
        render json: { info: I18n.t('rentals.cancel_success') }, status: 200
      else
        render json: { error: I18n.t('rentals.cancel_error') }, status: 400
      end
    end

    def check_availability
      rental = SportingGood.find_by_slug(params[:slug]).rentals.new(rental_params)
      if rental.is_available? && rental.get_price
        render json: rental, serializer: SimpleRentalSerializer, status: 200
      else
        render json: { error: rental.errors.full_messages }, status: 400
      end
    end

    def send_message
      rental = find_rental params[:hash_id]
      comment = rental.comments.new({
        comment: params[:message],
        user_id: current_user.id
      })
      if comment.save
        render json: rental, status: 200
      else
        render json: { error: I18n.t('rentals.error_saving_message') }, status: 400
      end 
    end

    private

    def rental_params
      params.require(:rental).permit(:start_date, :end_date, :pick_up_time, :agreed_to_terms)
    end

    def find_rental hash_id
      current_user.rentals.find_by_hash_id(hash_id) || current_user.owned_rentals.find_by_hash_id(hash_id)
    end

end
