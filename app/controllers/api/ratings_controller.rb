class Api::RatingsController < ApiController

  def create
    if params[:user_id]
      rating = User.find(params[:user_id]).ratings.authors_first_or_initialize(current_user, rating_params)
    else
      rating = SportingGood.find_by_slug(params[:sporting_good_slug]).ratings.authors_first_or_initialize(current_user, rating_params)
    end
    if rating
      render json: { info: I18n.t('ratings.contribution') }, status: 200
    else
      render json: { error: I18n.t('ratings.error') }, status: 404
    end
  end

  private

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
