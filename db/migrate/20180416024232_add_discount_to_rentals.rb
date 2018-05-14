class AddDiscountToRentals < ActiveRecord::Migration[5.0]
  def change
    add_column :rentals, :discount, :float, default: 0.00
  end
end
