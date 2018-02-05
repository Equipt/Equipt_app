# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
ActiveRecord::Base.establish_connection
ActiveRecord::Base.connection.tables.each do |table|
   ActiveRecord::Base.connection.execute("DELETE FROM #{table}") unless table == "schema_migrations"
end

SportingGood.reindex

# Skip callbacks
Phone.skip_callback(:save, :before, :send_verification_pin, raise: false)

@rentable_equipment_amount = (1..5).to_a
@equipment_category = [
	{camp: [
		'tent',
		'stove',
		'sleeping bag',
		'mat'
	]},
	{lake: [
		'kayak',
		'canone',
		'row'
	]},
	{bike: [
		'mountain bike',
		'road bike',
		'helmet'
	]},
	{snow: [
		'snowboard',
		'bindings',
		'skis',
		'boots',
		'jacket'
	]}
]

@equipment_images = ['tmp/kayak.jpg', 'tmp/snowboard.jpg', 'tmp/tent.jpg', nil];

def create_users

	3.times do |i|

		# Create Users
		email = Faker::Internet.email

		user = 	User.create!(
			firstname: Faker::Name.first_name,
			lastname: Faker::Name.last_name,
			email: email,
			username: Faker::Internet.user_name,
			restricted_availability: [true, false].sample,
			password: 'password',
			password_confirmation: 'password'
		)

    sleep 2

		(0..6).to_a.sample.times do |i|
      create_address(user) if user.save!
			create_sporting_good(user) if user.save!
      create_phone(user) if user.save!
			create_ratings(user) if user.save!
		end

	end

end

def create_address(user)

  address = Address.new(
    user_id: user.id,
    number: (1..1000).to_a.sample,
    unit: (1..50).to_a.sample,
    street: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    zip: Faker::Address.zip,
    country: Faker::Address.country,
    latitude: rand(49.28...49.88),
    longitude: rand(-122.12...-118.49)
  )

  address.save!(skip_geocoded_valiation: true)

end

def create_phone(user)

  Phone.create!(
    user_id: user.id,
    number: Faker::PhoneNumber.phone_number,
    verified: true
  )

end

def create_sporting_good(user)

	@rentable_equipment_amount.sample.times do |i|

		category_list = @equipment_category.sample
		category_key  = category_list.keys[0]
		sub_category  = category_list[category_key].sample
    price_per_day = (1..50).to_a.sample

    price_per_week = (price_per_day * 7) - (price_per_day * 7) * 0.10

		sporting_good = user.sporting_goods.create!(
			category: category_key.to_s,
			title: Faker::Commerce.product_name,
			brand: Faker::Commerce.product_name,
			model: Faker::Commerce.product_name,
			description: Faker::Lorem.paragraph(2),
			age: (1..10).to_a.sample,
			price_per_day: price_per_day,
			price_per_week: price_per_week,
			deposit: (10..100).to_a.sample
		)

    begin
        sporting_good.save!(:validate => false)
    rescue ActiveRecord::RecordInvalid => invalid
        next
    end

		5.times do |i|
			create_rentals(sporting_good, user) if sporting_good.save!
			sporting_good_image(sporting_good) if sporting_good.save!
		end

	end

end

def create_ratings instance

  rating = instance.ratings.create!(
    rating: (1..5).to_a.sample
  )

  create_comments(rating) if rating.save!

end

def create_comments instance

  instance.comment = Comment.create!(
    comment: Faker::Lorem.sentence(2)
  )

end

def sporting_good_image sporting_good

  file = @equipment_images.sample

  if file
    file = File.open(file)
    sporting_good.images.create!(file: file, primary: true)
  end

end

def create_rentals(sporting_good, user)

	rentals_amount = (1..5).to_a.sample

	rentals_amount.times do |i|

    now = DateTime.now
    one_year_later = now >> 12
    days_variance = (one_year_later - now).to_i
    start_date = Time.at((1.year.from_now.to_f - 1.day.from_now.to_f)*rand + 1.day.from_now.to_f)

    days_rented = (1..14).to_a.sample
    sub_total = sporting_good.price_per_day * days_rented

		rental = sporting_good.rentals.new(
      user_id: user.id,
      start_date: start_date,
      end_date: start_date + days_rented.days,
      pick_up_time: (0..24).to_a.sample,
      total_days: days_rented,
      sub_total: sub_total,
      total:  sporting_good.deposit + sub_total,
      deposit: sporting_good.deposit,
      completed: [true, false].sample,
      agreed_to_terms: true
		)

    begin
      rental.save!
    rescue ActiveRecord::RecordInvalid => invalid
      rental.save(validate: false)
    end

    rental.ratings.create!(
      rating: (1..5).to_a.sample
    )

	end

end

create_users
