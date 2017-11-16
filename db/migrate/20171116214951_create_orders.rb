class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.boolean :completed
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
