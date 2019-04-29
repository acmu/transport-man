import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withLayout from '#components/withLayout';
import cover from './cover.jpg';
import './style.less';

const formatTime = s => {
  const arr = s.split('/');
  return arr[0] + '年' + arr[1] + '月' + arr[2].split(' ')[0] + '日 ' + arr[2].split(' ')[1];
};

class HomePage extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
  };

  state = {
    time: new Date().toLocaleString(),
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: new Date().toLocaleString(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { time } = this.state;
    const { userInfo } = this.props;
    return (
      <div className='home-page'>
        <header
          style={{
            background: `url(${cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2>欢迎使用，{userInfo.userName}</h2>
        </header>
        <p>当前时间： {formatTime(time)}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  };
};

export default withLayout(connect(mapStateToProps)(HomePage));
