class Api::UtilsController < ApiController

  def report_a_bug
    UtilsMailer.send_bug({
      title: params[:title],
      desc: params[:desc]
    }).deliver
    render json: { info: I18n.t('utils.report_a_bug') }, status: 200
  end

end
