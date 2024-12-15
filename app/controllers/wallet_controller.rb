# app/controllers/wallet_controller.rb
class WalletController < ApplicationController
    def deposit
      user = @current_user
      amount = params[:amount].to_f
  
      # Call Stripe API or other payment gateway logic here...
  
      user.update(balance: user.balance + amount)
      render json: { message: 'Deposit successful', balance: user.balance }
    end
  end
  