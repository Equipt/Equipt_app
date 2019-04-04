class AddStripeIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :stripe_id, :string, default: false
  end
end
