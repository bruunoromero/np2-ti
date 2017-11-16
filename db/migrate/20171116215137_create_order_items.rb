class CreateOrderItems < ActiveRecord::Migration[5.1]
  def change
    create_table :order_items do |t|
      t.integer :quantity
      t.references :album, foreign_key: true
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
