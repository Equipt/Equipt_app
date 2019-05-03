class AddServiceFeeToRentals < ActiveRecord::Migration[5.0]
  def change
    add_column :rentals, :service_fee, :float, default: 0
  end
end
