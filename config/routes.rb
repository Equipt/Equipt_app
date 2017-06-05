Rails.application.routes.draw do
  
  resources :sporting_goods, param: :slug

  root 'sporting_goods#index'

end
