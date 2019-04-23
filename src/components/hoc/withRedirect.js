import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function withRedirect(WrappedComponent) {
  class WithRedirect extends Component {
    state = {
      url: '',
    };

    handleRedirect = target => {
      this.setState({
        url: target,
      });
    };

    render() {
      const { url } = this.state;
      if (url.length) {
        return <Redirect to={url} />;
      }
      return (
        <WrappedComponent redirect={this.handleRedirect} {...this.props} />
      );
    }
  }

  WithRedirect.displayName = `WithRedirect(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithRedirect;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withRedirect;
