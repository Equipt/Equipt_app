class CommentSerializer < ApplicationSerializer

  attributes :comment,
             :created_at,
             :user_profile,
             :user_id

  def user_profile
    @object.user.images.first.url if @object.user && @object.user.images.first
  end

  def user_id
    @object.user.id
  end

end
