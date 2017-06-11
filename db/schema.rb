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

ActiveRecord::Schema.define(version: 20170607043948) do

  create_table "api_keys", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "access_token"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["user_id"], name: "index_api_keys_on_user_id"
  end

  create_table "sporting_goods", force: :cascade do |t|
    t.string   "category"
    t.integer  "user_id"
    t.string   "title"
    t.string   "brand"
    t.string   "model"
    t.text     "description"
    t.integer  "age"
    t.float    "price_per_day"
    t.float    "price_per_week"
    t.float    "desposit",       default: 0.0
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "slug"
    t.index ["user_id"], name: "index_sporting_goods_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "email"
    t.string   "username"
    t.string   "unit"
    t.string   "street_number"
    t.string   "street"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "country"
    t.integer  "home_phone"
    t.integer  "cell_phone"
    t.float    "lng"
    t.float    "lat"
    t.string   "password"
    t.string   "password_digest"
    t.boolean  "restricted_availability", default: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

end
