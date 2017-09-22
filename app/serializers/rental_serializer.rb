class RentalSerializer < ActiveModel::Serializer

    @@all_day = true
    @@unavailable = 'unavailable'

    attributes  :hash_id,
                :title,
                :owned,
                :start,
                :end,
                :pick_up_time,
                :total_days,
                :deposit,
                :sub_total,
                :total,
                :confirmed,
                :all_day,
                :errors

    belongs_to :sporting_good

    def all_day
        @@all_day
    end

    def title
        @@unavailable if @instance_options[:unavailable]
        @@rentals if @instance_options[:your_renting]
        owned_rental_title if @instance_options[:owned_rental]
        if current_user.rentals.include?(@object)
          "Your renting #{ @object.sporting_good.title.capitalize } to #{ @object.user.firstname.capitalize }"
        elsif @object.sporting_good.user.id == current_user.id
          "#{ @object.user.firstname.capitalize } is renting #{ @object.sporting_good.title.capitalize } from you"
        else
            @@unavailable
        end
    end

    def owned
        return true if current_user.owned_rentals.include? @object
        false
    end

    def destroyed_message
       return  I18n.t('rentals.destroyed_message', item: @object.title) if @instance_options[:destroyed_message]
    end

    def include_associations!
        include! :sporting_good if @instance_options[:include_sporting_good]
    end

end
