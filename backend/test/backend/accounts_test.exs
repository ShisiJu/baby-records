defmodule Backend.AccountsTest do
  use Backend.DataCase, async: true

  alias Backend.Accounts

  @user_token_max_age 60 * 60 * 24 * 30

  test "get_user_by_token returns user for a valid token" do
    {:ok, user} =
      Accounts.create_user(%{
        email: "token-valid@example.com",
        password: "securepass123"
      })

    token = Accounts.generate_user_token(user)

    assert {:ok, fetched_user} = Accounts.get_user_by_token(token)
    assert fetched_user.id == user.id
  end

  test "get_user_by_token rejects a token older than 30 days" do
    {:ok, user} =
      Accounts.create_user(%{
        email: "token-expired@example.com",
        password: "securepass123"
      })

    expired_signed_at = System.os_time(:second) - @user_token_max_age - 1

    token =
      Phoenix.Token.sign(BackendWeb.Endpoint, "user_auth", user.id,
        signed_at: expired_signed_at
      )

    assert {:error, :invalid_token} = Accounts.get_user_by_token(token)
  end
end
