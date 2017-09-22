class Address < ApplicationRecord

  has_one :user, dependent: :destroy

end
