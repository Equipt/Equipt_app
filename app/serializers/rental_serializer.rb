class RentalSerializer < ActiveModel::Serializer

    @@all_day = false
    @@unavailable = 'unavailable'
    @@using = 'using'
    @@renting = 'renting'
    @@owned = 'owned'

    attributes  :hash_id,
                :title,
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
                :is_complete,
                :status,
                :owned

    belongs_to :sporting_good
    belongs_to :user, serializer: OwnerSerializer

    def all_day
        @@all_day
    end

    # def start_date
    #   @object.start_date.strftime("%A, %B %d %Y")
    # end
    #
    # def end_date
    #   @object.end_date.strftime("%A, %B %d %Y")
    # end

    def owned
      current_user.sporting_goods.where(id: @object.sporting_good.id).any?
    end

    def status
      if current_user.rentals.find_by_id(@object.id) && current_user.owned_rentals.find_by_id(@object.id)
        @@using
      elsif current_user.rentals.find_by_id(@object.id)
        @@renting
      elsif current_user.owned_rentals.find_by_id(@object.id)
        @@owned
      else
        @@unavailable
      end
    end

    def title
      if status == @@using
        "Your using #{ @object.sporting_good.title.capitalize } at this time"
      elsif status  == @@renting
        "Your renting #{ @object.sporting_good.title.capitalize } from #{ @object.sporting_good.user.firstname.capitalize }"
      elsif status == @@owned
        "#{ @object.user.firstname.capitalize } is renting #{ @object.sporting_good.title.capitalize } from you"
      else
        @@unavailable
      end
    end

    def is_complete
      @object.end_date.past?
    end

    def destroyed_message
       return  I18n.t('rentals.destroyed_message', item: @object.title) if @instance_options[:destroyed_message]
    end

    def include_associations!
        include! :sporting_good if @instance_options[:include_sporting_good]
    end

end
