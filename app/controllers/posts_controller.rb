class PostsController < ApplicationController
    def index
        posts = Post.all
        render json: posts
    end

    def create
        post = Post.create(post_params)
        render json: post
    end

    private
    def post_params
        params.permit(:title, :body, :photos, :user_id)
    end
end
