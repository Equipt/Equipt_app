class AddCancelReasonToRentals < ActiveRecord::Migration[5.0]
  def change
    add_column :rentals, :cancel_reason, :string
    add_column :rentals, :cancel_message, :string
  end
end
