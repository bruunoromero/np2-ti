class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :number
      t.string :security_code
      t.string :owner
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
