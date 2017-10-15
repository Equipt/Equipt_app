class CreatePhonesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :phones do |t|
      t.references :user, foreign_key: true
      t.string :number
      t.string :pin
      t.boolean :verifying, default: true
      t.boolean :verified, default: false
    end
  end
end
