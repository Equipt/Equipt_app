class AdminController < ActionController::Base

	 http_basic_authenticate_with name: "equipt", password: "password"

end