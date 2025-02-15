class User < ApplicationRecord
    has_secure_password 
    has_many :posts
    
    has_secure_password

    validates :username, presence: true, uniqueness: true
end
