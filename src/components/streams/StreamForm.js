import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderError({error, touched}) {
    if(touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //Função para renderizar os campos do formulário
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }

  //Função para submeter os dados do formulário
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render () {
    return (
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title"/>
        <Field 
          name="description" 
          component={this.renderInput} 
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  };
};

//Valida os dados do formulário
const validateFields = formValues => {
  const errors = {};
  
  if (!formValues.title) {
    errors.title = 'You must enter a title'
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description'
  }

  return errors;
};


export default reduxForm({
  form: 'streamForm',
  validate: validateFields
})(StreamForm)

