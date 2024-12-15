# app/controllers/game_controller.rb
class GameController < ApplicationController
    def start_round
      multiplier = rand(1.01..10.0).round(2)
      game = Game.create!(multiplier: multiplier, crashed_at: Time.now + rand(5..20).seconds)
      ActionCable.server.broadcast('game_channel', { multiplier: multiplier })
      render json: { game: game }
    end
  
    def place_bet
      user = @current_user
      bet_amount = params[:amount].to_f
      multiplier = params[:multiplier].to_f
  
      if user.balance >= bet_amount
        user.update(balance: user.balance - bet_amount)
        Bet.create!(user: user, amount: bet_amount, odds: multiplier, status: 'pending')
        render json: { message: 'Bet placed successfully' }
      else
        render json: { error: 'Insufficient balance' }, status: :unprocessable_entity
      end
    end
  end
  