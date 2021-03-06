{
  :en => {
    states: CS.states(:us),
    provinces: CS.states(:ca),
    countries: CS.countries,

    :frontend => {
      :logo => 'logo.png',
      :profile => {
        :tabs => [
            'Basic',
            'Contact',
            'Privacy',
            'Reviews'
        ],
        :privacy => {
          email_notifications: "Would you like to recieve email notifications?",
          delete_account: "I want to delete my account",
          delete: {
            are_you_sure: "Are you sure you want to delete you account",
            im_sure: "I\'m sure I want to delete my account",
            :consequences => [
              'Any goods you are renting will be removed',
              'Any rentals on your goods will be be cancelled',
              'Any rentals you have will be cancelled',
              'You cannot use this email again, If you resign up at an future date'
            ],
            we_appreciate_any_feedback: 'We appreciate any feedback'
          }
        },
        :basic => {
          title: "Signup",
          add_profile: "Add your image here!",
          :formFields => [
            {
              name: 'firstname',
              label: 'First Name',
              tag: 'input',
              type: 'text'
            },
            {
              name: 'lastname',
              label: 'Last Name',
              tag: 'input',
              type: 'text'
            },
            {
              name: 'email',
              label: 'Email',
              tag: 'input',
              type: 'email'
            }
          ]
        },
        :contact => {
          title: 'Enter your contact details below',
          button: 'Update Contact Info',
          need_contact: 'You haven\'t provided your contact details yet?',
          need_pin: 'Just one last step, we texted you a pin to verify your phone number.',
          resend_pin: 'I need another pin!',
          :phone => {
            :formFields => [
              {
                name: "number",
                label: "Phone",
                tag: "input",
                type: "text",
                error: "phone.number",
                placeholder: "333-333-3333",
                fieldsetClass: "col-xs-12"
              }
            ]
          },
          :address => {
            :formFields => [
              {
                name: "unit",
                label: "Unit",
                tag: "input",
                type: "text",
                fieldsetClass: "col-xs-1"
              },
              {
                name: "number",
                label: "Number",
                tag: "input",
                type: "text",
                error: "address.number",
                fieldsetClass: "col-xs-2"
              },
              {
                name: "street",
                label: "Street Name",
                tag: "input",
                type: "text",
                error: "address.street",
                fieldsetClass: "col-xs-9"
              },
              {
                name: "city",
                label: "City",
                tag: "input",
                type: "text",
                error: "address.city",
                fieldsetClass: "col-xs-6"
              },
              {
                name: "state",
                label: "state",
                tag: "select",
                type: "text",
                default: 'ca',
                error: "address.state",
                states: CS.states(:us),
                options: CS.states(:ca),
                fieldsetClass: "col-xs-6"
              },
              {
                name: "zip",
                label: "zip / postal code",
                tag: "input",
                type: "text",
                error: "address.zip",
                fieldsetClass: "col-xs-6"
              },
              {
                name: "country",
                label: "Country",
                tag: "select",
                type: "text",
                error: "address.country",
                default: 'CA',
                options: CS.countries,
                fieldsetClass: "col-xs-6"
              }
            ]
          }
        }
      }
    }
  }
}
