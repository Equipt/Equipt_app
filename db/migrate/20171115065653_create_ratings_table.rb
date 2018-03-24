class CreateRatingsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.integer :rateable_id
      t.string :rateable_type
      t.integer :rating, default: 0
      t.string :comment
      t.timestamps
    end
  end
end
