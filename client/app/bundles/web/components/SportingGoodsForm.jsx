import PropTypes from 'prop-types';
import React from 'react';
import Dropzone from 'react-dropzone'

export class SportingGoodsForm extends React.Component {

	static propTypes = {
		sporting_goods: PropTypes.object
	}

	static PREVIEW_SIZE = 200;

	constructor(props) {
		super(props);

		this.state = {
			files: []
		}
	}

	submit(e) {

		e.preventDefault();

		const { sportingGood } = this.props;

		sportingGood['images_attributes'] = [
			{
				file: 'file one',
				primary: false
			},
			{
				file: 'file two',
				primary: true
			}
		]

		this.props.actions.createSportingGood({
			sporting_good: sportingGood
		}, () => {

		});
		
	}

	onChange(name) {

		const { sportingGood } = this.props;

		sportingGood[name] = this.refs[name].value;
		this.setState( sportingGood );
	}

	onDrop(files, rejectedFiles) {

		this.setState({files: this.state.files.concat(files)});

  	}

  	removeFile(index) {

  		const { files } = this.state;

  		files.splice(index, 1);

  		this.setState({files: files});

  	}

	render() {

		const { sportingGood, content } = this.props;
		const { files } = this.state;
	
		return (
			<section className="container sporting-good-form">
				<div className="row">

					<div className="col-md-6 col-xs-12">
						<h3>{ content.title }</h3>
						<form onSubmit={ this.submit.bind( this ) }>
							{
								content.formFields.map((field, index) => {
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

						<ul className="drop-preview">
						{
							files.map((file, index) => {
								return (<li key={ `preview_img_${ index }` }>
									<i className="fa fa-times pull-right" aria-hidden="true" onClick={ this.removeFile.bind(this, index) }></i>
									<img width={ this.PREVIEW_SIZE } src={ file.preview }/>
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