defmodule BackendWeb.BabyProfileControllerTest do
  use BackendWeb.ConnCase, async: true

  defp auth_conn(conn, token) do
    conn
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", "Bearer #{token}")
  end

  test "show returns nil when no baby profile exists", %{conn: conn} do
    register_payload = %{
      "email" => "babyshow@example.com",
      "password" => "securepass123"
    }

    register_conn =
      conn
      |> put_req_header("accept", "application/json")
      |> post("/api/auth/register", register_payload)

    token = json_response(register_conn, 201)["token"]

    conn =
      build_conn()
      |> auth_conn(token)
      |> get("/api/baby-profile/me")

    assert %{"baby_profile" => nil} = json_response(conn, 200)
  end

  test "create persists baby profile for current user", %{conn: conn} do
    register_payload = %{
      "email" => "babycreate@example.com",
      "password" => "securepass123"
    }

    register_conn =
      conn
      |> put_req_header("accept", "application/json")
      |> post("/api/auth/register", register_payload)

    token = json_response(register_conn, 201)["token"]

    create_conn =
      build_conn()
      |> auth_conn(token)
      |> post("/api/baby-profile", %{"name" => "Noah", "birth_date" => "2024-01-10"})

    assert %{
             "baby_profile" => %{
               "name" => "Noah",
               "birth_date" => "2024-01-10"
             }
           } = json_response(create_conn, 201)

    login_conn =
      build_conn()
      |> put_req_header("accept", "application/json")
      |> post("/api/auth/login", register_payload)

    assert %{"user" => %{"has_baby_profile" => true}} = json_response(login_conn, 200)
  end

  test "create requires authorization", %{conn: conn} do
    conn = post(conn, "/api/baby-profile", %{"name" => "Noah", "birth_date" => "2024-01-10"})
    assert %{"error" => "Unauthorized"} = json_response(conn, 401)
  end
end
