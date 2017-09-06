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

    belongs_to :sporting_good

    def all_day
        @@all_day
    end

    def title
        @@title
    end

    def include_associations!
        include! :sporting_good if @instance_options[:include_sporting_good]
    end

end
