class User < ApplicationRecord
  has_one :card
  has_many :orders
  validates :email, uniqueness: true
  has_one :open_order, -> { where completed: false}, class_name: 'Order'

  def open_order_or_create 
    open_order = self.open_order
    if open_order.nil?
        open_order = Order.create completed: false

        unless self.orders << open_order
            raise 'could not create cart'
        end
    end

    open_order
  end
end
