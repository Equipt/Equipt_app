const DeleteSportingGood = () => (

  <section>
    <h4>{ content.delete.title }</h4>
    <p className="text-danger">{ content.delete.warning }</p>
    <button onClick={ actions.deleteSportingGood.bind(this, sportingGood.slug, () => {
      this.showModal.bind(this, 'showDeleteModal', false)
    }) }
    className="btn btn-danger">
    { content.delete.im_sure }
    </button>
    <button className="btn btn-info"
    onClick={ this.showModal.bind(this, 'showDeleteModal', false) }>
    { content.delete.dont_delete }
    </button>
  </section>

)

export default DeleteSportingGood;
