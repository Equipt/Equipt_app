import React from 'react';

export default function(fields = [], errors = {}, resource = {}) {

  function buildSelect(field) {

    const options = field.options || [];

    return (
      <select name={ field.name }
              ref={ field.name }
              defaultValue={ resource[field.name] }
              className="form-control">
      {
          options.map(option => {
            return <option key={ `${field.name}_option_${ option }` } value={ option }>{ option }</option>
          })
      }
    </select>);

  }

  function buildInput(field) {

    return (<input ref={ field.name }
                  name={ field.name }
                  className="form-control"
                  type={ field.type }
                  placeholder={ field.placeholder }
                  defaultValue={ resource[field.name] }
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
