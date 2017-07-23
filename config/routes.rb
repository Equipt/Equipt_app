Rails.application.routes.draw do

  namespace :api do 
    resources :session, only: [:create, :destroy]
    resources :sporting_goods, param: :slug
    resources :user, only: [:create]
  end

  get '/', to: 'home#index'
  get '*path', to: 'home#index'

	match 'api/auth/:provider/callback', to: 'api/session#facebook_auth', via: 'POST'
  match 'api/forgot_password', to: 'api/session#forgot_password', via: 'POST'
  match 'api/reset_password/:reset_token', to: 'api/session#reset_password', via: 'POST'
  	
end
