web: bundle exec rake assets:clean RAILS_ENV=$FOREMAN_ENV && bundle exec rake assets:precompile RAILS_ENV=$FOREMAN_ENV && bundle exec puma -C config/puma.rb
worker: bundle exec rake jobs:work
