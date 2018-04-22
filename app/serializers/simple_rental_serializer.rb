class SimpleRentalSerializer < ApplicationSerializer


  attributes  :hash_id,
              :title,
              :start_date,
              :end_date,
              :total_days,
              :discount,
              :sub_total,
              :total

  def title
    @object.title current_user
  end

  def total_days
    @object.total_days - 1
  end
  
end
