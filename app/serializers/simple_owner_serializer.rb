class SimpleOwnerSerializer < ApplicationSerializer

  attributes :hash_id,
             :firstname,
             :lastname,
             :profile

  def profile
   @object.images.first.url if @object.images.first
  end

end
