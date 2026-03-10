defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :password, :string, virtual: true, redact: true
    field :password_hash, :string, redact: true
    has_one :baby_profile, Backend.Accounts.BabyProfile

    timestamps(type: :utc_datetime)
  end

  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> update_change(:email, &normalize_email/1)
    |> validate_required([:email, :password])
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/, message: "must have the @ sign and no spaces")
    |> validate_length(:email, max: 160)
    |> validate_length(:password, min: 8, max: 72)
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    password = get_change(changeset, :password)

    if changeset.valid? and is_binary(password) do
      changeset
      |> put_change(:password_hash, Bcrypt.hash_pwd_salt(password))
      |> delete_change(:password)
    else
      changeset
    end
  end

  defp normalize_email(email) when is_binary(email), do: String.downcase(String.trim(email))
  defp normalize_email(email), do: email
end
