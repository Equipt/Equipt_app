Rails.application.routes.draw do

    namespace :api do

        resources :user
        resources :session, only: [:create, :destroy]
        resources :rentals, exclude: [:create], param: :hash_id

        resources :sporting_goods, only: [:index, :show], param: :slug do
            resources :rentals, only: [:create, :show], param: :hash_id
        end

        namespace :owner do
            resources :sporting_goods, param: :slug do
              resources :rentals, only: [:show, :create]
            end
            resources :rentals, param: :hash_id
        end

    end

    namespace :admin do
        resources :users do
            resources :sporting_goods
        end
    end

    match 'api/phone/resend_pin', to: 'api/phone#resend_pin', via: 'GET'
    match 'api/session/fetch_user', to: 'api/session#fetch_user', via: 'GET'
    match 'api/sporting_goods/:slug/ratings', to: 'api/sporting_goods#ratings', via: 'POST'

    get '/', to: 'home#index'
    get '*path', to: 'home#index'

    match 'api/auth/:provider/callback', to: 'api/session#facebook_auth', via: 'POST'
    match 'api/forgot_password', to: 'api/session#forgot_password', via: 'POST'
    match 'api/reset_password/:reset_token', to: 'api/session#reset_password', via: 'POST'
    match 'api/phone/verify', to: 'api/phone#verify', via: 'POST'
    match 'api/sporting_goods/:slug/rentals/check_availability', to: 'api/rentals#check_availability', via: 'POST'

end
