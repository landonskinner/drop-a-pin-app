# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# User.create(name: 'bob', username: 'bob123', email: 'bob@gmail.com', password: 'password')

u1 = User.create(name: 'bob', username: 'bob123', email: 'bob@gmail.com', password: 'password')
u2 = User.create(name: 'landon', username: 'landon123', email: 'landon@gmail.com', password: 'password')


p1 = Post.create(title: 'hello', body: 'bye', user_id: u1.id)

c1 = Comment.create(text: 'good', post_id: p1.id, username: 'bob')
c2 = Comment.create(text: 'Much wow', post_id: p1.id, username: 'bob')

Like.create(post_id: p1.id, username: 'bob')