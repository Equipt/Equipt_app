import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone'

export class SportingGoodsForm extends React.Component {

	static propTypes = {
		sporting_goods: PropTypes.object,
		createOrUpdate: PropTypes.func.isRequired
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

		const { sportingGood } = this.props;
		const { images } = this.state;

		const { slug } = this.context.router.route.match.params;

		this.props.createOrUpdate(sportingGood, images, slug, () => {
			this.context.router.history.push('/owner/sporting_goods');
		});

	}

	onChange(name) {

		const { sportingGood } = this.props;

		sportingGood[name] = this.refs[name].value;
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

		const content 	   		= this.props.content;
		const sportingGood 		= this.props.sportingGood || {};
		const images 	   		= this.state.images || [];
		const errors 	   		= sportingGood.errors || {};
		const imageLimitMessage = this.state.showLimitMessage ? <p className="alert alert-info">{ content.imageLimit }</p> : '';

		return (
			<section className="container sporting-good-form">
				<div className="row">

					<div className="col-md-6 col-xs-12">
						<h3>{ content.title }</h3>
						<form onSubmit={ this.submit.bind( this ) }>
							{
								content.formFields.map((field, index) => {

									let fieldErrors = errors[field.name] || [];

									if (field.tag === 'input') {

										return (
											<fieldset key={ `fieldset_${ field.name }_${ index }` }
													  className={ field.type === 'number' ? `col-md-6 col-xs-12 no-margin number-container` : `` }>
												<label>{ field.label }</label>
												<input 	name={ field.name }
														onChange={ this.onChange.bind(this, field.name) }
														className='form-control'
														type={ field.type }
														ref={ field.name }
														value={ sportingGood[field.name] || '' }
												/>
												{
													fieldErrors.map((error, index) => {
														return <p className="text-danger" key={ `${field.name}_error_${index}` }>{ error }</p>;
													})
												}
											</fieldset>
										);

									} else if (field.tag === 'select') {

										return (
											<fieldset key={ `select_${ field.name }_${ index }` }>
												<label>{ field.label }</label>
												<select name={ field.name }
														ref={ field.name }
														className="form-control"
														onChange={ this.onChange.bind(this, field.name) }
														value={ sportingGood[field.name] || '' }
												>
													<option>Please Select a type</option>
													{
														field.options.map((option, index) => {
															return (
																<option value={ option } key={ `option_${ index }` }>
																	{ option }
																</option>
															)
														})
													}
												</select>
												{
													fieldErrors.map((error, index) => {
														return <p className="text-danger" key={ `${field.name}_error_${index}` }>{ error }</p>;
													})
												}
											</fieldset>
										);

									} else if (field.tag === 'textarea') {

										return (
											<fieldset key={ `textfield_${ field.name }_${ index }` }>
												<label>{ field.label }</label>
												<textarea 	className="form-control"
															name={ field.name }
															ref={ field.name }
															onChange={ this.onChange.bind(this, field.name) }
															value={ sportingGood[field.name] || ''}/>
											</fieldset>
										);

									}
								})
							}

							<br/>

							<input type="submit" className="btn btn-success clearfix col-xs-12" value="Add Item"/>
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
