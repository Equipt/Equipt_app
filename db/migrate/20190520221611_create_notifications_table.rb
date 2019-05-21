class CreateNotificationsTable < ActiveRecord::Migration[5.0]
  def change
    create_table :notifications do |t|
      t.integer :notificationable_id
      t.string :notificationable_type
      t.text :message
      t.references :user
      t.boolean :seen, default: false
      t.string :resource
      t.string :resource_id
      t.timestamps
    end
  end
end
