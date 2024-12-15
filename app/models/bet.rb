class Bet < ApplicationRecord
  belongs_to :user
  validates :amount, numericality: { greater_than: 0 }
  validates :odds, numericality: { greater_than: 1.0 }
  validates :status, inclusion: { in: %w[pending won lost] }
end
