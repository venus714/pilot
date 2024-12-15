class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.text :history
      t.float :multiplier
      t.datetime :crashed_at

      t.timestamps
    end
  end
end
