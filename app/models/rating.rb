class Rating < ApplicationRecord
  belongs_to :rateable, :polymorphic => true
  has_one :comment, :as => :commentable, dependent: :destroy

  accepts_nested_attributes_for :comment

end
