class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :photos
  has_one :user
  has_many :comments
end
