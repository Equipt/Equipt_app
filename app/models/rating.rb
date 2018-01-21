class Rating < ApplicationRecord

  belongs_to :rateable, :polymorphic => true

  has_many :comments, :as => :commentable, dependent: :destroy

  after_save do
    rateable.reindex_parent if rateable.methods.include? :reindex_parent
  end

end
