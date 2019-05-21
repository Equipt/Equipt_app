Rails.application.routes.draw do

    namespace :api do

        resources :user
        resources :session, only: [:create, :destroy]
        resources :rentals, exclude: [:create], param: :hash_id

        resources :sporting_goods, only: [:index, :show], param: :slug do
            resources :rentals, only: [:create, :show], param: :hash_id do
              resources :ratings, only: [:create]
            end
        end

        namespace :owner do
            resources :sporting_goods, param: :slug do
              resources :rentals, param: :hash_id, only: [:show, :create]
							resources :unavailabilities, only: [:create]
            end
            resources :rentals, param: :hash_id do
              resources :ratings, only: [:create]
            end
        end

    end

    namespace :admin do
        resources :users do
            resources :sporting_goods do
							resources :rentals
						end
						resources :rentals
        end
    end

    # Create ratings through emails
    resources :ratings, only: [:create]

    namespace :owners do
      resources :ratings, only: [:create]
    end

    match 'api/phone/resend_pin', to: 'api/phone#resend_pin', via: 'GET'
    match 'api/session/fetch_user', to: 'api/session#fetch_user', via: 'GET'
    match '.well-known/acme-challenge/:content', to: lambda { |env| [200, {}, [env["action_dispatch.request.path_parameters"][:content].to_s]] }, via: 'GET'

    get '/', to: 'home#index'
    get '*path', to: 'home#index'

    match 'api/auth/:provider/callback', to: 'api/session#facebook_auth', via: 'POST'
    match 'api/forgot_password', to: 'api/session#forgot_password', via: 'POST'
    match 'api/reset_password/:reset_token', to: 'api/session#reset_password', via: 'POST'
    match 'api/phone/verify', to: 'api/phone#verify', via: 'POST'
    match 'api/sporting_goods/:slug/rentals/check_availability', to: 'api/rentals#check_availability', via: 'POST'
    match 'api/report_a_bug', to: 'api/utils#report_a_bug', via: 'POST'

    match 'api/user/basic', to: 'api/user#basic_update', via: 'PUT'
    match 'api/password_update', to: 'api/user#password_update', via: 'PUT'
    match 'api/rentals/:hash_id/cancel', to: 'api/rentals#cancel', via: 'PUT'
    match 'api/rentals/:hash_id/send_message', to: 'api/rentals#send_message', via: 'POST'

end
