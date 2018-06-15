web: bundle exec puma -C config/puma.rb
worker: bundle exec rake jobs:work
client: sh -c 'rm -rf public/webpack/development/* || true && cd client && bundle exec rake react_on_rails:locale && yarn run build:production:client'
server: cd client && yarn run build:production:server
