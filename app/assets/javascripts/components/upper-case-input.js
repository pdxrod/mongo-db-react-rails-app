import * as React from 'react';

export class UpperCaseInput extends React.Component {
  render() {
    return <input {...this.props} value={this.props.toUpperCase()} />;
  }
}
