Geocoder.configure(

  # to use an API key:
  api_key: ENV['GOOGLE_MAPS'],

  # geocoding service request timeout, in seconds (default 3):
  timeout: 15,
  :use_https => true

  # set default units to kilometers:
  # units: :km,

)
