Rails.application.routes.draw do
  root 'home#index'

  scope '/api' do
    resources :albums, only: [:index, :show]
  end

  get '*path', to: 'home#index'
end
  