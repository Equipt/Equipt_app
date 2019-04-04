class PaymentMethod < ApplicationRecord

  validates_presence_of :token, :primary
  belongs_to :payment_method

end
