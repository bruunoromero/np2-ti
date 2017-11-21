Rails.application.routes.draw do
  root 'home#index'

  scope '/api' do
    resources :albums, only: [:index, :show]
    post '/users/login', to: 'users#login'
    post '/users/orders', to: 'users#orders'
    post '/users/register', to: 'users#register'
    post '/users/checkout', to: 'users#checkout'
    post '/users/add_card', to: 'users#add_card'
    post '/users/add_to_cart', to: 'users#add_to_cart'
    post '/users/remove_product', to: 'users#remove_product'
    put '/users/set_product_quantity', to: 'users#set_product_quantity'
  end

  get '*path', to: 'home#index'
end
  