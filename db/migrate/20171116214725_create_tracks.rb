class CreateTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :tracks do |t|
      t.stirng :title
      t.string :duration
      t.references :album, foreign_key: true

      t.timestamps
    end
  end
end
