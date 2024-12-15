# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
    def authenticate_user!
      token = request.headers['Authorization']&.split(' ')&.last
      decoded_token = JWT.decode(token, Rails.application.secret_key_base).first
      @current_user = User.find(decoded_token['user_id'])
    rescue JWT::DecodeError
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
  