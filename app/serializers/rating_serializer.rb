class RatingSerializer < ActiveModel::Serializer

  include ActionView::Helpers::DateHelper

  attributes :score,
             :created_at,
             :comment

  def comment
    @object.comment.comment if @object.comment
  end

  def created_at
    time_ago_in_words(@object.created_at).capitalize
  end

end
