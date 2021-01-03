Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users do
        collection do
          get :search
        end
      end
    end
  end

  root to: 'base#index'
end
