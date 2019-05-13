class AddCancelledToRentals < ActiveRecord::Migration[5.0]
  def change
    add_column :rentals, :cancelled, :boolean, default: false
  end
end
