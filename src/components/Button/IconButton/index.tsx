import React, { SFC } from 'react';
import styles from './styles.css';

type IProps = {
  active?: boolean;
} & React.HTMLAttributes<any>;

const IconButton: SFC<IProps> = ({ active, children, ...props }) => (
  <button
    className={`${styles['icon-button']} ${
      active ? styles['icon-button-actived'] : ''
    }`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
