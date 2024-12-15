class CreateBets < ActiveRecord::Migration[7.0]
  def change
    create_table :bets do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :amount
      t.float :odds
      t.string :status

      t.timestamps
    end
  end
end
