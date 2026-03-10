defmodule Backend.Accounts.BabyProfile do
  use Ecto.Schema
  import Ecto.Changeset

  schema "baby_profiles" do
    field :name, :string
    field :birth_date, :date
    belongs_to :user, Backend.Accounts.User

    timestamps(type: :utc_datetime)
  end

  def changeset(baby_profile, attrs) do
    baby_profile
    |> cast(attrs, [:name, :birth_date])
    |> validate_required([:name, :birth_date, :user_id])
    |> validate_length(:name, min: 1, max: 100)
    |> unique_constraint(:user_id)
  end
end
