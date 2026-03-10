defmodule Backend.Repo.Migrations.CreateBabyProfiles do
  use Ecto.Migration

  def change do
    create table(:baby_profiles) do
      add :name, :string, null: false
      add :birth_date, :date, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:baby_profiles, [:user_id])
  end
end
