class CreateRatingsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.integer :rateable_id
      t.string :rateable_type
      t.integer :score
      t.timestamps
    end
  end
end
