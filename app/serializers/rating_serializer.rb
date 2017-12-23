class RatingSerializer < ActiveModel::Serializer

  include ActionView::Helpers::DateHelper

  attributes :rating,
             :created_at

  has_many :comments

  def created_at
    time_ago_in_words(@object.created_at).capitalize
  end

end
