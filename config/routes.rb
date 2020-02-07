Rails.application.routes.draw do
  root to: 'articles#index'
  resources :articles, only: %i[index create destroy update]
end
