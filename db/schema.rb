# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190430061659) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.integer "user_id"
    t.string  "unit"
    t.string  "number"
    t.string  "street"
    t.string  "city"
    t.string  "state"
    t.string  "zip"
    t.string  "country"
    t.float   "latitude"
    t.float   "longitude"
    t.boolean "verified",  default: false
    t.index ["user_id"], name: "index_addresses_on_user_id", using: :btree
  end

  create_table "api_keys", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "access_token"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["user_id"], name: "index_api_keys_on_user_id", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.text     "comment"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "images", force: :cascade do |t|
    t.string   "imageable_type"
    t.integer  "imageable_id"
    t.string   "file"
    t.boolean  "primary"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "url"
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree
  end

  create_table "phones", force: :cascade do |t|
    t.integer "user_id"
    t.string  "number"
    t.string  "pin"
    t.boolean "verifying", default: false
    t.boolean "verified",  default: false
    t.index ["user_id"], name: "index_phones_on_user_id", using: :btree
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.integer  "rating",        default: 0
    t.string   "comment"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "author_id"
    t.index ["author_id"], name: "index_ratings_on_author_id", using: :btree
  end

  create_table "rentals", force: :cascade do |t|
    t.string   "hash_id"
    t.integer  "sporting_good_id"
    t.integer  "user_id"
    t.date     "start_date"
    t.date     "end_date"
    t.float    "pick_up_time"
    t.float    "sub_total",         default: 0.0
    t.float    "deposit",           default: 0.0
    t.float    "total",             default: 0.0
    t.integer  "total_days"
    t.boolean  "completed",         default: false
    t.boolean  "confirmed",         default: false
    t.boolean  "agreed_to_terms",   default: false
    t.datetime "deleted_at"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.float    "discount",          default: 0.0
    t.string   "stripe_payment_id"
    t.index ["deleted_at"], name: "index_rentals_on_deleted_at", using: :btree
    t.index ["hash_id"], name: "index_rentals_on_hash_id", using: :btree
    t.index ["sporting_good_id"], name: "index_rentals_on_sporting_good_id", using: :btree
    t.index ["user_id"], name: "index_rentals_on_user_id", using: :btree
  end

  create_table "sporting_goods", force: :cascade do |t|
    t.string   "category"
    t.integer  "user_id"
    t.string   "title"
    t.string   "brand"
    t.string   "model"
    t.text     "description"
    t.integer  "age",            default: 0,   null: false
    t.float    "price_per_day",  default: 0.0, null: false
    t.float    "price_per_week", default: 0.0, null: false
    t.float    "deposit",        default: 0.0, null: false
    t.datetime "deleted_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "slug"
    t.index ["deleted_at"], name: "index_sporting_goods_on_deleted_at", using: :btree
    t.index ["user_id"], name: "index_sporting_goods_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "hash_id"
    t.integer  "address_id"
    t.integer  "phone_id"
    t.string   "firstname"
    t.string   "lastname"
    t.string   "email"
    t.string   "username"
    t.string   "password"
    t.string   "password_digest"
    t.boolean  "restricted_availability", default: false
    t.datetime "deleted_at"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "provider"
    t.string   "uid"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "password_reset_token"
    t.string   "password_reset_sent_at"
    t.boolean  "notify_by_email",         default: true
    t.boolean  "notify_by_sms",           default: false
    t.boolean  "terms",                   default: false
    t.string   "stripe_customer_id"
    t.index ["address_id"], name: "index_users_on_address_id", using: :btree
    t.index ["deleted_at"], name: "index_users_on_deleted_at", using: :btree
    t.index ["hash_id"], name: "index_users_on_hash_id", using: :btree
    t.index ["phone_id"], name: "index_users_on_phone_id", using: :btree
  end

  add_foreign_key "addresses", "users"
  add_foreign_key "phones", "users"
  add_foreign_key "ratings", "users", column: "author_id"
  add_foreign_key "rentals", "sporting_goods"
  add_foreign_key "rentals", "users"
  add_foreign_key "sporting_goods", "users"
end
