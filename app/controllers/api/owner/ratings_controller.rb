class Api::Owner::RatingsController < ApiController

  def create
    rating = rental.user.ratings.authors_first_or_initialize(current_user, rating_params)
    if rating
      render json: { info: I18n.t('ratings.contribution') }, status: 200
    else
      render json: { error: I18n.t('ratings.error') }, status: 404
    end
  end

  private

  def rental
    Rental.find_by_hash_id(params[:rental_hash_id])
  end

  def rating_params
    params[:rating][:comment_attributes] = {
        comment: params[:rating][:comment]
    }
    params.require(:rating).permit(
      :rating,
      comment_attributes: [
        :comment
      ]
    )
  end

end
