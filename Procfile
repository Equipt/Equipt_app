web: bundle exec puma bundle exec puma -C config/puma.rb
client: bundle exec rake assets:clean RAILS_ENV=$FOREMAN_ENV && bundle exec rake assets:precompile RAILS_ENV=$FOREMAN_ENV
worker: bundle exec rake jobs:work
