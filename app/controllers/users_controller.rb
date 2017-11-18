class UsersController < ApplicationController
    before_action :set_user, only: [:login]

    def login
        unless @user.nil?
            password = params[:password]
            if password == @user.password
                render json: @user
            end
        end

        raise 'user not found'
    end

    def register
        email = params[:email]
        password = params[:password]
        password_again = params[:passwordAgain]
        if password == password_again && !email.empty?
            render json: User.create(email: email, password: password)
        end

        raise 'passwords not match or your email is empty'
    end

    private
    def set_user
        @user = User.find_by email: params[:email]
    end

end