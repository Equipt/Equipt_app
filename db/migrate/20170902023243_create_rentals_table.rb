class CreateRentalsTable < ActiveRecord::Migration[5.0]
    def change
        create_table :rentals do |t|
            t.string :hash_id, index: true
            t.references :sporting_good, foreign_key: true
            t.references :user, foreign_key: true
            t.date :start
            t.date :end
            t.float :pick_up_time
            t.float :sub_total, default: 0
            t.float :deposit, default: 0
            t.float :total, default: 0
            t.integer :total_days
            t.boolean :completed, default: false
            t.boolean :confirmed, default: false
            t.boolean :agreed_to_terms, default: false
            t.datetime :deleted_at, index: true
            t.timestamps
        end
    end
end
