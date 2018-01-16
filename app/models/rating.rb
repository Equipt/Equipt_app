class Rating < ApplicationRecord

  belongs_to :rateable, :polymorphic => true

  has_many :comments, :as => :commentable, dependent: :destroy

  after_save do
    self.rateable.reindex_parent
  end

end
