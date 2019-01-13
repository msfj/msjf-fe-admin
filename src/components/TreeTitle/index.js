import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default class FontTitle extends Component {
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

  operateAction = (type, e) => {
    e.stopPropagation();
  };

  render() {
    const { title, isRoot } = this.props;
    const { isHook } = this.state;
    return (
      <span
        className={styles.box}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onFocus={() => 0}
      >
        <span className={styles.text}>{title}</span>
        {isHook && (
          <span>
            {!isRoot && (
              <Icon
                onClick={e => {
                  this.operateAction('plus', e);
                }}
                className={styles.icon}
                type="plus"
              />
            )}
            <Icon
              onClick={e => {
                this.operateAction('form', e);
              }}
              className={styles.icon}
              type="form"
            />
            <Icon
              onClick={e => {
                this.operateAction('delete', e);
              }}
              className={styles.icon}
              type="delete"
            />
          </span>
        )}
      </span>
    );
  }
}
