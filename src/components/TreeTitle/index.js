import React, { Component } from 'react';
import styles from './index.less';

export default class TreeTitle extends Component {
  state = {
    isHook: false,
  };

  handleMouseOver = () => {
    this.setState({
      isHook: true,
    });
  };

  handleMouseOut = () => {
    this.setState({
      isHook: false,
    });
  };

  render() {
    const { title, operateBtn } = this.props;
    const { isHook } = this.state;
    return (
      <span
        className={styles.box}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onFocus={() => 0}
      >
        <span className={styles.text}>{title}</span>
        {isHook && operateBtn}
      </span>
    );
  }
}
