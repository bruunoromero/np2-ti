Rails.application.routes.draw do
  root 'home#index'

  scope '/api' do
    resources :albums, only: [:index, :show]
    post '/users/login', to: 'users#login'
    post '/users/register', to: 'users#register'
  end

  get '*path', to: 'home#index'
end
  