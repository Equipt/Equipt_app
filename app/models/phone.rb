class Phone < ApplicationRecord

  has_one :user, dependent: :destroy

end
