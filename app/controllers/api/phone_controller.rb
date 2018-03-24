class Api::PhoneController < ApiController

  before_action :ensure_authenticated_user

  def verify
    phone = current_user.phone
    if phone && phone.verify_pin(params[:pin])
      render json: phone, verify_notice: true, status: 200
    else
      render json: { error: "Sorry this pin is incorrect!"}, status: 400
    end
  end

  def resend_pin
    phone = current_user.phone
    phone.send_verification_pin
    if phone.save!
      render json: { info: "Pin has been reset"}, status: 200
    end
  end

end
