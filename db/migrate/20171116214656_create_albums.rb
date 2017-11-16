class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :title
      t.string :artist
      t.double :price

      t.timestamps
    end
  end
end
