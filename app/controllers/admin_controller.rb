class AdminController < ApplicationController

	 http_basic_authenticate_with name: "equipt", password: "password"

end