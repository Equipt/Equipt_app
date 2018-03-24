class CreateApiKeyTable < ActiveRecord::Migration[5.0]
  	def change
    	create_table :api_keys do |t|
    		t.references :user
      		t.string :access_token
      		t.timestamps
    	end
  	end
end
