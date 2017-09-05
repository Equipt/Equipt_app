class RentalSerializer < ActiveModel::Serializer

    @@all_day = true
    @@title = 'unavailable'

    attributes  :hash_id,
                :title,
                :start,
                :end,
                :set_total_days,
                :all_day,
                :errors

    def all_day
        @@all_day
    end

    def title
        @@title
    end

end
