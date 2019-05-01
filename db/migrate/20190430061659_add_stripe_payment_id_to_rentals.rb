class AddStripePaymentIdToRentals < ActiveRecord::Migration[5.0]
  def change
    add_column :rentals, :stripe_payment_id, :string
  end
end
