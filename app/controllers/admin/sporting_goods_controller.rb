class Admin::SportingGoodsController < AdminController

	def index
		@user = User.find(params[:user_id])
		@sporting_goods = @user.sporting_goods
	end

	def destroy
		@user = User.find(params[:user_id])
		@sporting_good = @user.sporting_goods.find_by_slug(params[:id])
		redirect_to admin_user_sporting_goods_path if @sporting_good.destroy
	end

end