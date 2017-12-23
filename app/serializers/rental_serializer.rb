class RentalSerializer < ActiveModel::Serializer

    @@all_day = false
    @@unavailable = 'unavailable'

    attributes  :hash_id,
                :title,
                :owned,
                :start,
                :end,
                :start_date,
                :end_date,
                :pick_up_time,
                :total_days,
                :deposit,
                :sub_total,
                :total,
                :confirmed,
                :all_day,
                :errors,
                :owner,
                :is_complete

    belongs_to :sporting_good
    belongs_to :user, serializer: OwnerSerializer

    def all_day
        @@all_day
    end

    def start_date
      @object.start.strftime("%A, %B %d %Y")
    end

    def end_date
      @object.end.strftime("%A, %B %d %Y")
    end

    def start
      @object.start.to_date + 1.day
    end

    def end
      @object.end.to_date + 1.day
    end

    def title
      if current_user.rentals.find_by_id(@object.id)
        "Your renting #{ @object.sporting_good.title.capitalize } from #{ @object.sporting_good.user.firstname.capitalize }"
      elsif owned
        "#{ @object.user.firstname.capitalize } is renting #{ @object.sporting_good.title.capitalize } from you"
      else
        @@unavailable
      end
    end

    def owned
      return true if current_user.owned_rentals.find_by_id(@object.id)
      false
    end

    def is_complete
      @object.end.past?
    end

    def destroyed_message
       return  I18n.t('rentals.destroyed_message', item: @object.title) if @instance_options[:destroyed_message]
    end

    def include_associations!
        include! :sporting_good if @instance_options[:include_sporting_good]
    end

end
