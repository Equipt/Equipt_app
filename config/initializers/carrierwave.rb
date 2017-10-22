# sample config/initializers/carrierwave.rb
CarrierWave.configure do |config|

  if Rails.env.development? || Rails.env.test?
    config.storage = :file
  else
    config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => ENV['AWS_ACCESS_KEY'],
      :aws_secret_access_key  => ENV['AWS_SECRET_KEY'],
      :region                 => 'us-west-1'
    }
    config.storage = :fog
    config.fog_directory = 'equipt-app'
  end
end
