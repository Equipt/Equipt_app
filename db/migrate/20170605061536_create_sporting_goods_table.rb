class CreateSportingGoodsTable < ActiveRecord::Migration[5.0]
  	def change
    	create_table :sporting_goods do |t|
			t.string :category
			t.references :user, foreign_key: true
			t.string :title
			t.string :brand
			t.string :model
			t.text :description
			t.integer :age
			t.float :price_per_day
			t.float :price_per_week
			t.float :deposit, default: 0.00
			t.timestamps
	    end
  	end
end
