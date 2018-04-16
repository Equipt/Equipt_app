import React from 'react';

const DeleteSportingGood = ({ sportingGood, actions }) => (

  <section>
    <h4>{ I18n.t('sporting_good.delete.header', {item: sportingGood.title}) }</h4>
    <p className="text-danger">{ I18n.t('sporting_good.delete.sub_header') }</p>
    <button onClick={ () => actions.deleteSportingGood(sportingGood.slug, () => actions.closeModal()) } className="btn btn-danger">
      { I18n.t('sporting_good.delete.im_sure') }
    </button>
    <br/>
    <button className="btn btn-info" onClick={ actions.closeModal }>
      { I18n.t('sporting_good.delete.dont_delete') }
    </button>
  </section>

)

export default DeleteSportingGood;
