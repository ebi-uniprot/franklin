import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import '../styles/components/in-page-nav.scss';

const InPageNav__old = ({ sections, sticky = true }) => (
  <div className={`in-page-nav ${sticky && 'in-page-nav--sticky'}`}>
    <div items={sections.map(section => section.id)} currentClassName="in-page-nav--active">
      {sections.map(section => (
        <li className={section.disabled && 'in-page-nav--disabled'} key={section.label}>
          <a href={`#${section.id}`}>{section.label}</a>
        </li>
      ))}
    </div>
  </div>
);

// Recursively generates the entire menu and sub-menu items.
function generateNavMenu(navItems, active, onClick) {
  const items = navItems.map((item) => {
    const { pathname, hash } = document.location;
    const currentPage = `${pathname}${hash}`;

    // If no item is 'active' by scroll or click events triggered by the user,
    // check if the item's 'to' value is matching the current page address. If
    // it does match, then highlight this menu item by manually calling the 'onClick'
    // callback on this item.
    if (currentPage === item.to && !active) {
      onClick(item.section);
    }

    // the single menu item element
    let el = null;

    // The 'NavLink' from React Router works fine here, so we are using the 'NavLink'
    // and will just give it an 'activeClassName'.
    if (item.type === "link") {
      el = (
        <NavLink to={item.to} activeClassName="active">
          {item.label}
        </NavLink>
      );
    }
    // The 'NavHashLink' from react-router-hash-link does NOT work with auto-highlight
    // and a few other things as well, so we have to do use the 'HashLink' and do some
    // manual work to handle the active elements.
    else if (item.type === "hash") {
      el = (
        <HashLink
          to={item.to}
          smooth
          id={item.id}
          className={active === item.section && "active"}
          onClick={() => onClick(item.section)}
        >
          {item.label}
        </HashLink>
      );
    }

    const submenu = item.children ? generateNavMenu(item.children) : null;

    return (
      <li>
        {el}
        {submenu}
      </li>
    );
  });

  return <ul>{items}</ul>;
}

const InPageNav = ({ items, active, onClick }) => {

  return 'okay';
};

InPageNav.propTypes = {
  // sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sticky: PropTypes.bool,
};

InPageNav.defaultProps = {
  sticky: true,
};

export default InPageNav;
