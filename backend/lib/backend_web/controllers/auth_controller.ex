defmodule BackendWeb.AuthController do
  use BackendWeb, :controller

  alias Backend.Accounts
  alias Backend.Accounts.User

  def register(conn, params) do
    case Accounts.create_user(params) do
      {:ok, user} ->
        token = Accounts.generate_user_token(user)

        conn
        |> put_status(:created)
        |> json(%{token: token, user: user_payload(user)})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: errors_from_changeset(changeset)})
    end
  end

  def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        token = Accounts.generate_user_token(user)
        json(conn, %{token: token, user: user_payload(user)})

      {:error, :invalid_credentials} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Invalid email or password"})
    end
  end

  def login(conn, _params) do
    conn
    |> put_status(:unprocessable_entity)
    |> json(%{error: "email and password are required"})
  end

  defp user_payload(%User{id: id, email: email}) do
    %{id: id, email: email}
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
