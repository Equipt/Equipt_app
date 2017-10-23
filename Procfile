web: bundle exec rake assets:clean RAILS_ENV=$FOREMAN_ENV && bundle exec rake assets:precompile RAILS_ENV=$FOREMAN_ENV && bundle exec puma -e $FOREMAN_ENV
worker: bundle exec rake jobs:work
