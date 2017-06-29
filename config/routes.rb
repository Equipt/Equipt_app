Rails.application.routes.draw do
  	
  	namespace :api do 
  		resources :session, only: [:create, :destroy]
  		resources :sporting_goods, param: :slug
  		resources :user, only: [:create]
  	end

  	get '/', to: 'home#index'
  	get '*path', to: 'home#index'
  	
end
