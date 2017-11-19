Rails.application.routes.draw do
  root 'home#index'

  scope '/api' do
    resources :albums, only: [:index, :show]
    post '/users/login', to: 'users#login'
    post '/users/register', to: 'users#register'
    post '/users/add_to_cart', to: 'users#add_to_cart'
  end

  get '*path', to: 'home#index'
end
  