import React, { ReactElement } from 'react';
import { HeaderProps } from './Header-props';

const Header = (props: HeaderProps): ReactElement => {
  return (
    <div className="header">
      <div className="container container-header">
        <h1 className="header_title">{props.title}</h1>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: 'Developer Manager',
};

export default Header;
