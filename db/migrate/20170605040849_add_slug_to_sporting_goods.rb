class AddSlugToSportingGoods < ActiveRecord::Migration[5.0]
  def change
    add_column :sporting_goods, :slug, :string
  end
end
