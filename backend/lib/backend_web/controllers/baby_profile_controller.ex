defmodule BackendWeb.BabyProfileController do
  use BackendWeb, :controller

  alias Backend.Accounts
  alias Backend.Accounts.BabyProfile

  def show(conn, _params) do
    current_user = conn.assigns.current_user

    case Accounts.get_baby_profile_for_user(current_user) do
      %BabyProfile{} = baby_profile ->
        json(conn, %{baby_profile: baby_profile_payload(baby_profile)})

      nil ->
        json(conn, %{baby_profile: nil})
    end
  end

  def create(conn, params) do
    current_user = conn.assigns.current_user

    case Accounts.create_baby_profile_for_user(current_user, params) do
      {:ok, baby_profile} ->
        conn
        |> put_status(:created)
        |> json(%{baby_profile: baby_profile_payload(baby_profile)})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: errors_from_changeset(changeset)})
    end
  end

  defp baby_profile_payload(%BabyProfile{id: id, name: name, birth_date: birth_date}) do
    %{
      id: id,
      name: name,
      birth_date: Date.to_iso8601(birth_date)
    }
  end

  defp errors_from_changeset(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Regex.replace(~r/%{(\w+)}/, message, fn _, key ->
        value = Keyword.get(opts, String.to_existing_atom(key), key)
        to_string(value)
      end)
    end)
  end
end
