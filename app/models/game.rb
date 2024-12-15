class Game < ApplicationRecord
    validates :multiplier, numericality: { greater_than_or_equal_to: 1.0 }
  end
  