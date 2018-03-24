class PhoneSerializer < ActiveModel::Serializer

  attributes :number,
             :verified,
             :verifying,
             :notice,
             :errors

  def notice
 		{ info: "#{ @object.number } has been verified" } if @instance_options[:verify_notice]
   end

end
