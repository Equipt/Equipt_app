class Rating < ApplicationRecord

  scope :authors_first_or_initialize, -> (author, params) {
    rental = find_by(author_id: author.id)
    return rental.update_attributes(params) if rental
    rating = self.new(params)
    rating.author = author
    rating
  }

  belongs_to :rateable, :polymorphic => true
  belongs_to :author, class_name: "User"
  before_save :already_rated
  has_one :comment, :as => :commentable, dependent: :destroy

  validates_presence_of :rating, :comment

  accepts_nested_attributes_for :comment, allow_destroy: true

  after_save do
    rateable.reindex_sporting_good if rateable.methods.include? :reindex_sporting_good
  end

  def already_rated
    return true unless self.rateable.ratings.where(author_id: self.author).any?
    errors.add(:error, I18n.t('ratings.already_rated'))
    false
  end

end
