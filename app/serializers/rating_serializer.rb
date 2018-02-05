class RatingSerializer < ActiveModel::Serializer

  include ActionView::Helpers::DateHelper

  attributes :rating,
             :created_at,
             :comment

  def created_at
    time_ago_in_words(@object.created_at).capitalize
  end

  def comment
    @object.comment.comment if @object.comment
  end

end
