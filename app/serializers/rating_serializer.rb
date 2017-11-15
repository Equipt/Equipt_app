class RatingSerializer < ActiveModel::Serializer

  attributes :score,
             :created_at

  has_many :comments

end
