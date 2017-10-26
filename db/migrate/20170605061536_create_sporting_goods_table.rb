class CreateSportingGoodsTable < ActiveRecord::Migration[5.0]
  	def change
    	create_table :sporting_goods do |t|
			t.string :category
			t.references :user, foreign_key: true
			t.string :title
			t.string :brand
			t.string :model
			t.text :description
			t.integer :age, default: 0.0, null: false
			t.float :price_per_day, default: 0.0, null: false
			t.float :price_per_week, default: 0.0, null: false
			t.float :deposit, default: 0.0, null: false
      t.datetime :deleted_at, index: true
			t.timestamps
	    end
  	end
end
