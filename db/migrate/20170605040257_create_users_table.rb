class CreateUsersTable < ActiveRecord::Migration[5.0]
    def change
	    create_table :users do |t|
      t.string :hash_id, index: true
      t.references :address
      t.references :phone
			t.string :firstname
			t.string :lastname
			t.string :email
			t.string :username
			t.string :password
			t.string :password_digest
			t.boolean :restricted_availability, default: false
      t.datetime :deleted_at, index: true
			t.timestamps
	    end
  	end
end
