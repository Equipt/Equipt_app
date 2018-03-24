class CreateImagesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.references :imageable, polymorphic: true
      t.string :file
      t.boolean :primary
      t.timestamps
    end
  end
end
