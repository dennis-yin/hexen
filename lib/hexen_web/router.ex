defmodule HexenWeb.Router do
  use HexenWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", HexenWeb do
    pipe_through :api

    resources "/map", MapController, only: [:show]
  end

  scope "/", HexenWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", HexenWeb do
  #   pipe_through :api
  # end
end
