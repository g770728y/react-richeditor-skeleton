import React from 'react';

type ButtonProps = {
  primary?: boolean;
} & React.InputHTMLAttributes<any>;

const Button: React.SFC<ButtonProps> = ({ primary, onClick, ...rest }) => {
  const background = primary ? '#0084ff' : 'transparent';
  const borderColor = primary ? '#0084ff' : 'transparent';
  const border = `1px solid ${borderColor}`;
  const color = primary ? '#fff' : '#1a1a1a';
  const padding = '0 8px';
  const lineHeight = '20px';
  const borderRadius = '3px';
  const styles = {
    background,
    border,
    color,
    padding,
    lineHeight,
    borderRadius,
    cursor: 'pointer'
  };
  return (
    <input type="button" style={styles} {...rest} onClick={e => onClick!(e)} />
  );
};

export default Button;

export { default as IconButton } from './IconButton';
