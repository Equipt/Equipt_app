class CreateAddressesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.references :user, foreign_key: true
      t.string :unit
      t.string :number
      t.string :street
      t.string :city
      t.string :state
      t.string :zip
      t.string :country
      t.float :latitude
      t.float :longitude
      t.boolean :verified, default: false
    end
  end
end
