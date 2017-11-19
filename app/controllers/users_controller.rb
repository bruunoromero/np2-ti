class UsersController < ApplicationController
    before_action :set_user, only: [:login, :add_to_cart]
    before_action :validate_user, only: [:login, :add_to_cart]
    before_action :sync_cart, only: [:login]

    def login
        render json: @user, include: { open_order: { include: {order_items: { include: :album } } } }
    end

    def register
        email = params[:email]
        password = params[:password]
        password_again = params[:passwordAgain]
        if password == password_again && !email.nil? && !email.empty?
            @user = User.create(email: email, password: password)
            sync_cart
            render json: User.find(@user.id), include: { open_order: { include: {order_items: { include: :album } } } }
        elsif
            raise 'passwords not match or your email is empty'
        end
    end

    def add_to_cart
        if params[:album_id].nil?
            raise 'no album sent'
        end

        album_id = params[:album_id]
        album = Album.find album_id

        open_order = @user.open_order_or_create

        order_item = open_order.order_items.where album: album

        if order_item.length == 0
            order_item = OrderItem.new album: album, quantity: 1
            
            if open_order.order_items << order_item
                render json: order_item
            else
                raise 'could not add item to cart'
            end
    
        else
            item = order_item.first
            
            if item.increment! :quantity
                render json: item
            else
                raise 'could not add item to cart'
            end
        end
    end

    private
    def set_user
        @user = User.find_by email: params[:email]
    end

    def validate_user
        if @user.nil?
            raise 'permission denied'
        end

        if @user.password != params[:password]
            raise 'permission denied'
        end
    end

    def sync_cart
        items = params[:cart]
        open_order = @user.open_order_or_create
        unless items.nil?
            items.each do |item|
                unless item[:id]
                    raise 'product not found'
                end
    
                album = Album.find item[:id]
                quantity = item[:quantity] || 0
    
                order_item = open_order.order_items.find_by album: album
                if order_item.nil?
                    order_item = OrderItem.new album: album, quantity: quantity
                    open_order.order_items << order_item
                else
                    unless order_item.increment! :quantity, quantity
                        raise 'could not add item to cart'
                    end
                end
            end
        end
    end

end