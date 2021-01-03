module Api
  module V1
    class UsersController < ApplicationController
      include ReactTable

      protect_from_forgery unless: -> { request.format.json? }

      def index
        users = User.order(sort_query(safe_fields))
                    .where(filter_query(safe_fields)&.inject(:merge) || {})
                    .page(params[:page])
                    .per(params[:page_size] || 10)

        pages = User.all.count.to_i / (params[:page_size] ? params[:page_size].to_i : 10)

        render json: { collection: users, pages: pages },
               page_size_param: params[:page_size]
      end

      def show
        render json: User.find(params[:id])
      end

      def create
        @user = User.new(user_params)

        if @user.save
          render json: @user, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def update
        @user = User.find(params[:id])

        if @user.update(user_params)
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @user = User.find(params[:id])

        if @user.delete
          head :no_content
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def search
        searchable_users = User.full_text_search(search_params[:q], allow_empty_search: true)
        users = searchable_users
                .order(sort_query(safe_fields))
                .where(filter_query(safe_fields)&.inject(:merge) || {})
                .page(params[:page])
                .per(params[:page_size] || 10)

        pages = searchable_users.count.to_i / (params[:page_size] ? params[:page_size].to_i : 10)

        render json: { collection: users, pages: pages },
               page_size_param: params[:page_size]
      end

      private

      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:first_name, :last_name, :email)
      end

      def safe_fields
        %w[first_name last_name email]
      end

      def search_params
        params.permit(:q)
      end
    end
  end
end
