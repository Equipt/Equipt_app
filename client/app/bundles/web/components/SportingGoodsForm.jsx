import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone';

import FormFieldsHelper from 'helpers/FormFields';

export class SportingGoodsForm extends React.Component {

	static propTypes = {
		sporting_goods: PropTypes.object,
		createOrUpdate: PropTypes.func.isRequired,
		isEditing: PropTypes.bool
	}

	static contextTypes = {
  		router: PropTypes.shape({
    		history: PropTypes.object.isRequired
  		})
	};

	constructor(props) {
		super(props);

		this.PREVIEW_SIZE = 200;
		this.IMAGES_LIMIT = 5;

		this.state = {
			sportingGood: this.props.sportingGood,
			images: [],
			showLimitMessage: false
		}
	}

	componentWillReceiveProps(props) {
		if (props.sportingGood && props.sportingGood.images) {
			this.setState({images: this.state.images.concat(props.sportingGood.images)});
		}
	}

	submit(e) {

		e.preventDefault();

		const { slug } = this.context.router.route.match.params;
		const { sportingGood } = this.state;
		const { images } = this.state;

		this.props.createOrUpdate(sportingGood, images, slug, () => {
			this.context.router.history.push('/owner/sporting_goods');
		});

	}

	onChange(field) {

		const { sportingGood } = this.state;

		sportingGood.images = this.state.images;
		sportingGood[field.name] = this.refs[field.name].value;
		this.setState( sportingGood );

	}

	onDrop(files, rejectedFiles) {

		console.log(this.IMAGES_LIMIT);

		if (this.state.images.length < 5) {
			this.setState({
				images: this.state.images.concat(files),
				showLimitMessage: false
			});
		} else {
			this.setState({showLimitMessage: true});
		}

  }

	removeFile(index) {

		const { images } = this.state;

		images.splice(index, 1);

		this.setState({images: images});

	}

	render() {

		const content 	   	= this.props.content || {};
		const formFields 		= content.formFields || [];
		const sportingGood 	= this.props.sportingGood || {};
		const images 	   		= this.state.images || [];
		const errors 	   		= sportingGood.errors || {};
		const imageLimitMessage = this.state.showLimitMessage ? <p className="alert alert-info">{ content.imageLimit }</p> : '';

		return (
			<section className="container sporting-good-form">
				<div className="row">

					<div className="col-md-6 col-xs-12">
						<h3>{ content.title }</h3>
						<form onSubmit={ this.submit.bind( this ) }>

							<div className="row">
								{ FormFieldsHelper.call(this, formFields, errors, sportingGood) }
							</div>

							<br/>

							<input type="submit" className="btn btn-success clearfix col-xs-12" value={ this.props.isEditing ? "Update" : "Add" }/>
						</form>
					</div>

					<div className="col-md-6 col-xs-12 drop-container">

						<Dropzone onDrop={ this.onDrop.bind(this) } className="drop-area">
							<p>{ content.dropZone }</p>
							<i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
						</Dropzone>

						{ imageLimitMessage }

						<ul className="drop-preview">
						{
							images.map((file, index) => {
								return (<li key={ `preview_img_${ index }` }>
									<i className="fa fa-times pull-right" aria-hidden="true" onClick={ this.removeFile.bind(this, index) }></i>
									<img width={ this.PREVIEW_SIZE } src={ file.preview || file.file.url }/>
								</li>);
							})
						}
						</ul>

					</div>

				</div>
			</section>
		)

	}

};
