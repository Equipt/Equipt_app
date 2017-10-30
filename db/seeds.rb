# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
ActiveRecord::Base.establish_connection
ActiveRecord::Base.connection.tables.each do |table|
   ActiveRecord::Base.connection.execute("DELETE FROM #{table}") unless table == "schema_migrations"
end

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

# @equipment_images = ['tmp/kayak.jpg', 'tmp/snowboard.jpg', 'tmp/tent.jpg', nil];

def create_users

	5.times do |i|

		# Create Users
		email = Faker::Internet.email

		user = 	User.create(
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
			create_sporting_good(user) if user.save!
      create_address(user) if user.save!
      create_phone(user) if user.save!
			# create_ratings(user) if user.save!
		end

	end

end

def create_address(user)

  Address.create(
    user_id: user.id,
    unit: (1..50).to_a.sample,
    street: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    zip: Faker::Address.zip,
    country: Faker::Address.country,
    latitude: Faker::Address.latitude,
    longitude: Faker::Address.longitude
  )

end

def create_phone(user)

  Phone.create(
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

		sporting_good = user.sporting_goods.create(
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
        sporting_good.save!
    rescue ActiveRecord::RecordInvalid => invalid
        next
    end

		5.times do |i|
			create_rentals(sporting_good, user) if sporting_good.save!
			# create_ratings(equipment) if equipment.save!
		end

		# file = @equipment_images.sample

		# if file
		# 	image = equipment.images.new
		# 	image.file = File.open(file)
		# 	image.save!
		# end

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
      start: start_date,
      end: start_date + days_rented.days,
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

	end

end

def create_ratings(model)
	model.ratings.create(
		score: (1..5).to_a.sample,
		comment: Faker::Lorem.sentence(3)
	)
end

create_users

admin = User.create(
	firstname: 'tom',
	lastname: 'tom',
	email: 'tom@tom.com',
	username: 'tommy',
	restricted_availability: [true, false].sample,
	password: 'tom'
)

Address.create(
  user_id: admin.id,
  street: '123 fake street',
  city: 'Vancouver',
  state: 'BC',
  zip: '10002',
  country: 'Canada',
  latitude: '-123.1280044',
  longitude: '49.2841339',
)

Phone.create(
  user_id: admin.id,
  number: '333.333.3333',
  verified: true
)

10.times do |i|
	create_sporting_good(admin)
end
