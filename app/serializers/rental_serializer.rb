class RentalSerializer < ApplicationSerializer

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
                :discount,
                :sub_total,
                :total,
                :confirmed,
                :all_day,
                :errors,
                :owner,
                :is_complete,
                :status,
                :owned,
                :rating,
                :time_to

    belongs_to :sporting_good, serializer: SportingGoodsSerializer
    belongs_to :user, serializer: OwnerSerializer

    def all_day
        @@all_day
    end

    def owned
      current_user.sporting_goods.where(id: @object.sporting_good.id).any?
    end

    def status
      @object.status current_user
    end

    def title
      @object.title current_user
    end

    def is_complete
      @object.end_date.past? || @object.end_date.today?
    end

    def total_days
      @object.total_days if @object.total_days
    end

    def destroyed_message
       return  I18n.t('rentals.destroyed_message', item: @object.title) if @instance_options[:destroyed_message]
    end

    def include_associations!
        include! :sporting_good if @instance_options[:include_sporting_good]
    end

    def rating
      return @object.user.ratings.find_by(author_id: current_user.id) if owned
      @object.sporting_good.ratings.find_by(author_id: current_user.id)
    end

    def time_to
      TimeDifference.between(@object.start_date, Time.now).in_general
    end

end
