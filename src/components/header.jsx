import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import DropdownButton from './dropdown-button';

import '../styles/components/header.scss';
import '../styles/components/dropdown.scss';

const HeaderLink = ({ link }) => {
  if (link.path && link.href) {
    throw new Error('Only specify "path" or "href" not both.');
  }
  return (
    <>
      {link.path ? (
        <Link to={link.path} className="button tertiary">
          {link.label}
        </Link>
      ) : (
        <a
          href={link.href}
          className="button tertiary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      )}
    </>
  );
};

HeaderLink.propTypes = {
  link: PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string,
    href: PropTypes.string,
  }).isRequired,
};

const Header = ({ logo, links, search, isNegative }) => (
  <div className={cn('header', { 'header--negative': isNegative })}>
    <div className="header__logo">
      <Link to="/">{logo}</Link>
    </div>
    <ul className="header__navigation">
      {links.map((link) =>
        link.links ? (
          <li key={link.label}>
            <DropdownButton
              label={link.label}
              className={cn({
                'dropdown-container__trigger--negative': isNegative,
              })}
            >
              <ul>
                {link.links.map((link2) => (
                  <li key={link2.label}>
                    <HeaderLink link={link2} />
                  </li>
                ))}
              </ul>
            </DropdownButton>
          </li>
        ) : (
          <li key={link.label}>
            <HeaderLink link={link} />
          </li>
        )
      )}
    </ul>
    <div className="header__search">{search}</div>
  </div>
);

Header.propTypes = {
  logo: PropTypes.element,
  links: PropTypes.arrayOf(PropTypes.object),
  search: PropTypes.element,
  isNegative: PropTypes.bool,
};

Header.defaultProps = {
  logo: undefined,
  links: [],
  search: undefined,
  isNegative: false,
};

export default Header;
