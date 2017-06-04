Rails.application.routes.draw do
  
  resources :sporting_goods

  root 'sporting_goods#index'

end
