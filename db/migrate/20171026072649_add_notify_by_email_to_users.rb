class AddNotifyByEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :notify_by_email, :boolean, default: true
    add_column :users, :notify_by_sms, :boolean, default: false
  end
end
