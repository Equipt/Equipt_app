import React from 'react';

export default function(fields = [], errors = {}, resource = {}) {

  const buildSelect = field => {

    const options = field.options || [];

    let optionsMarkUp = [];

    if (options instanceof Array) {
      optionsMarkUp = options.map(option => {
        return <option key={ `${field.name}_option_${ option }` } value={ option }>{ option }</option>;
      });
    } else {
      optionsMarkUp = Object.keys(options).map(key => {
        let option = options[key];
        return <option key={ `${field.name}_option_${ option }` } value={ key }>{ option }</option>;
      });
    }

    return (
      <select name={ field.name }
              ref={ field.name }
              defaultValue={ resource[field.name] || field.default }
              disabled={ field.disabled }
              className="form-control"
              onChange={ () => this.setState({
                [field.name]: this.refs[field.name].value
              }) }>
              {optionsMarkUp}
    </select>);

  }

  const buildInput = field => {

    return (<input ref={ field.name }
                  name={ field.name }
                  className="form-control"
                  type={ field.type }
                  placeholder={ field.placeholder }
                  disabled={ field.disabled }
                  step={ field.step }
                  min={ field.min }
                  defaultValue={ resource[field.name] || field.default }
                  onChange={ () => this.setState({
                    [field.name]: this.refs[field.name].value
                  }) }
            />);

  }


  return fields.map((field, index) => {

      const fieldErrors = errors[field.name] || [];

      return 	(
        <fieldset className={ field.fieldsetClass } key={ `field_${ index }` }>
          <br/>
          <label>{ field.label }</label>
          { field.tag === 'select' ? buildSelect(field) : buildInput(field) }
          {
            fieldErrors.map((error, index) => {
              return <p className="text-danger" key={ `${field.name}_error_${index}` }>{ error }</p>;
            })
          }
        </fieldset>
      );

    });

}
