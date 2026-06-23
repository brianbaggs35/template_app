Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      # API routes go here
    end
  end

  # Catch-all: serve the Vue SPA for any non-API route
  get "*path", to: "pages#spa", constraints: ->(req) { !req.path.start_with?("/api/", "/rails/") }
  root "pages#spa"
end
