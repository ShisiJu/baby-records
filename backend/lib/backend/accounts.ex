defmodule Backend.Accounts do
  @moduledoc false

  alias Backend.Accounts.User
  alias Backend.Repo

  def create_user(attrs) when is_map(attrs) do
    %User{}
    |> User.registration_changeset(attrs)
    |> Repo.insert()
  end

  def authenticate_user(email, password) when is_binary(email) and is_binary(password) do
    normalized_email = String.downcase(String.trim(email))
    user = Repo.get_by(User, email: normalized_email)

    if user && Bcrypt.verify_pass(password, user.password_hash) do
      {:ok, user}
    else
      Bcrypt.no_user_verify()
      {:error, :invalid_credentials}
    end
  end

  def authenticate_user(_, _), do: {:error, :invalid_credentials}

  def generate_user_token(%User{id: user_id}) do
    Phoenix.Token.sign(BackendWeb.Endpoint, "user_auth", user_id)
  end
end
