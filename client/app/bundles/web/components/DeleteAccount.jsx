import React from 'react';
import PropTypes from 'prop-types';

export class DeleteAccount extends React.Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      feedback: ''
    }
  }

  updateFeedback() {

    const feedback = this.refs.feedback.value;

    this.setState({
      feedback: feedback
    });

  }

  acceptedConsequences() {

    let hasAccepted = true;

    Object.keys(this.refs).forEach(key => {
      if (key.indexOf('consequence') > -1 && !this.refs[key].checked) {
        hasAccepted = false;
      }
    });

    return hasAccepted;

  }

  deleteAccount(e) {
    e.preventDefault();

    const { actions, currentUser } = this.props;
    const { feedback } = this.state;

    if (this.acceptedConsequences()) {
      actions.deleteCurrentUser(currentUser, this.state.feedback);
    } else {
      actions.showErrorAlert({error: 'You must agree to all consequences'});
    }
  }

  render() {

    const { content } = this.props;

    return (
      <div className="delete-account-container">

        <h4>{ content.profile.privacy.delete.are_you_sure }</h4>

        <form onSubmit={ this.deleteAccount.bind(this) }>

          <ul>
            {
              content.profile.privacy.delete.consequences.map((consequence, index) => {
                return <div className="radio-container"
                            key={ `delete_account_consequence_${ index }` }>
                              <input type="radio" ref={ `consequence_${ index }` }/>
                              <span>{ consequence }</span>
                       </div>;
              })
            }
          </ul>

          <h5>{ content.profile.privacy.delete.we_appreciate_any_feedback }</h5>
          <textarea name="feedback" ref="feedback" onChange={ this.updateFeedback.bind(this) }/>

          <br/>

          <button type="submit" className="btn btn-danger">{ content.profile.privacy.delete.im_sure }</button>

        </form>

      </div>
    )

  }

}
