defmodule Backend.Accounts do
  @moduledoc false

  import Ecto.Query

  alias Backend.Accounts.BabyProfile
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

  def get_user_by_token(token) when is_binary(token) do
    with {:ok, user_id} <- Phoenix.Token.verify(BackendWeb.Endpoint, "user_auth", token),
         user when not is_nil(user) <- Repo.get(User, user_id) do
      {:ok, user}
    else
      _ -> {:error, :invalid_token}
    end
  end

  def get_user_by_token(_), do: {:error, :invalid_token}

  def user_has_baby_profile?(%User{id: user_id}), do: user_has_baby_profile?(user_id)

  def user_has_baby_profile?(user_id) do
    Repo.exists?(from bp in BabyProfile, where: bp.user_id == ^user_id)
  end

  def get_baby_profile_for_user(%User{id: user_id}), do: get_baby_profile_for_user(user_id)

  def get_baby_profile_for_user(user_id) do
    Repo.get_by(BabyProfile, user_id: user_id)
  end

  def create_baby_profile_for_user(%User{id: user_id}, attrs) do
    %BabyProfile{user_id: user_id}
    |> BabyProfile.changeset(attrs)
    |> Repo.insert()
  end

  def generate_user_token(%User{id: user_id}) do
    Phoenix.Token.sign(BackendWeb.Endpoint, "user_auth", user_id)
  end
end
