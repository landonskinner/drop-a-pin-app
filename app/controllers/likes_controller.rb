class LikesController < ApplicationController

    def index
        likes = Like.all
        render json: likes
    end

    def create
        like = Like.create(like_params)
        render json: like
    end

    def destroy
        like = Like.find_by(id: params[:id])
        like.destroy
        render json: {}
    end

    private

    def like_params
        params.permit(:username, :post_id)
    end

end
