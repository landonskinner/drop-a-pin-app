class LikeSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_one :post
end
