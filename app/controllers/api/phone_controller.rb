class Api::PhoneController < ApiController

  def verify
    phone = current_user.phone
    if phone && phone.verify_pin(params[:pin])
      render json: current_user, verify_notice: true, send_api_token: true, status: 200
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
