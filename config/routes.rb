Rails.application.routes.draw do
  resources :articles
  root to: 'articles#index'

  namespace :api do
    namespace :v1 do
      resources :fruits, only: %i[index create destroy update]
    end
  end
end
