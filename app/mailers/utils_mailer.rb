class UtilsMailer < ApplicationMailer

  def send_bug bug
    @bug = bug
    mail :to => ENV['DEFAULT_EMAIL'], :subject => bug[:title]
  end

end
