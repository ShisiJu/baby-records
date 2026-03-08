defmodule BackendWeb.AuthControllerTest do
  use BackendWeb.ConnCase, async: true

  test "register creates user and returns token", %{conn: conn} do
    conn = put_req_header(conn, "accept", "application/json")

    payload = %{
      "email" => "parent@example.com",
      "password" => "securepass123"
    }

    conn = post(conn, "/api/auth/register", payload)
    body = json_response(conn, 201)

    assert %{"token" => token, "user" => user} = body
    assert is_binary(token)
    assert user["email"] == "parent@example.com"
  end

  test "login returns token for valid credentials", %{conn: conn} do
    conn = put_req_header(conn, "accept", "application/json")

    register_payload = %{
      "email" => "login@example.com",
      "password" => "securepass123"
    }

    _register_conn = post(conn, "/api/auth/register", register_payload)

    login_conn =
      build_conn()
      |> put_req_header("accept", "application/json")
      |> post("/api/auth/login", register_payload)

    body = json_response(login_conn, 200)
    assert %{"token" => token, "user" => user} = body
    assert is_binary(token)
    assert user["email"] == "login@example.com"
  end

  test "login returns unauthorized for invalid credentials", %{conn: conn} do
    conn = put_req_header(conn, "accept", "application/json")

    conn = post(conn, "/api/auth/login", %{"email" => "missing@example.com", "password" => "wrongpass"})
    body = json_response(conn, 401)

    assert body == %{"error" => "Invalid email or password"}
  end
end
