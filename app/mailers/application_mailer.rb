class ApplicationMailer < ActionMailer::Base
  default from: ENV['DEFAULT_EMAIL']
  layout 'mailer'

  before_filter :email_image_tag
  after_filter :user_allows_emails

  def email_image_tag
    attachments.inline["logo.png"] = File.read("#{Rails.root}/app/assets/images/logo.png")
  end

  def user_allows_emails
    user = User.find_by_email message.to
    message.perform_deliveries = false unless user.notify_by_email
  end

end
