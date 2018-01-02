class Rating < ApplicationRecord

  belongs_to :rateable, :polymorphic => true

  has_many :comments, :as => :commentable, dependent: :destroy

  # after_save :reindex_sporting_good

  private

  # def reindex_sporting_good
  #   rental = Rental.find(self.rateable_id)
  #   if self.rateable_type == 'Rental' &&
  #     .sporting_good.reindex!
  #   end
  # end

end
