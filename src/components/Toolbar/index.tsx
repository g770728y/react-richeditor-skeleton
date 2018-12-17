import React, { SFC } from 'react';
import styles from './styles.css';

const Toolbar: SFC<{}> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Toolbar;
