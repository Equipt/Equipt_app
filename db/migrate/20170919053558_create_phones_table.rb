class CreatePhonesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :phones do |t|
      t.references :user, foreign_key: true
      t.string :number
      t.boolean :valiated
    end
  end
end
