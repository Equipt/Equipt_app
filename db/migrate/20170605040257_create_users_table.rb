class CreateUsersTable < ActiveRecord::Migration[5.0]
    def change
	    create_table :users do |t|
			t.string :firstname
			t.string :lastname
			t.string :email
			t.string :username
			t.string :unit
			t.string :street_number
			t.string :street
			t.string :city
			t.string :state
			t.string :zip
			t.string :country
			t.integer :home_phone
			t.integer :cell_phone
			t.float :lng
			t.float :lat
			t.string :password
			t.string :password_digest
			t.boolean :restricted_availability, default: false
			t.timestamps
	    end
  	end
end
