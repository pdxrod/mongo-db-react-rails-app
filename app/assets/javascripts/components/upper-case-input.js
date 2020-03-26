import * as React from 'react';
const { register } = require('react-cucumber');
const { UpperCaseInput } = require('../../app/assets/javascripts/components/upper-case-input');

export class UpperCaseInput extends React.Component {
  render() {
    return <input {...this.props} value={this.props.toUpperCase()} />;
  }
}
