{
  :en => {
    :frontend => {
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
        :contact => {
          button: 'Update Contact Info',
          :phone => {
            :formFields => [
              {
                name: "number",
                label: "Phone",
                tag: "input",
                type: "text",
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
                fieldsetClass: "col-xs-1"
              },
              {
                name: "street",
                label: "Street Name",
                tag: "input",
                type: "text",
                fieldsetClass: "col-xs-10"
              },
              {
                name: "city",
                label: "City",
                tag: "input",
                type: "text",
                fieldsetClass: "col-xs-6"
              },
              {
                name: "state",
                label: "state",
                tag: "select",
                type: "text",
                default: 'ca',
                states: CS.states(:us),
                options: CS.states(:ca),
                fieldsetClass: "col-xs-6"
              },
              {
                name: "zip",
                label: "zip / postal code",
                tag: "input",
                type: "text",
                fieldsetClass: "col-xs-6"
              },
              {
                name: "country",
                label: "Country",
                tag: "select",
                type: "text",
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
