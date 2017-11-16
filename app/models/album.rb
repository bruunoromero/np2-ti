class Album < ApplicationRecord
  has_many :tracks
  has_many :order_items
end
