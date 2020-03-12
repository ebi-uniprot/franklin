import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import '../styles/components/in-page-nav.scss';

const generateNavMenu = (items, active, onClick) => {
  const { hash } = document.location;
  const navItems = items.map(item => {
    // If no item is 'active' by scroll or click events triggered by the user,
    // check if the item's 'to' value is matching the current page address. If
    // it does match, then highlight this menu item by manually calling the 'onClick'
    // callback on this item.
    if (hash === item.to && !active) {
      onClick(item.section);
    }

    // The 'NavHashLink' from react-router-hash-link does NOT work with auto-highlight
    // and a few other things as well, so we have to do use the 'HashLink' and do some
    // manual work to handle the active elements.
    return (
      <li className={active === item.section ? 'in-page-nav--active' : ''}>
        <HashLink
          to={item.to}
          id={item.id}
          onClick={() => onClick(item.section)}
        >
          {item.label}
        </HashLink>
      </li>
    );
  });

  return <ul className="in-page-nav">{navItems}</ul>;
};

const InPageNav = ({ items, active }) => {
  const [activeSection, setActiveSection] = useState(null);

  if (active && activeSection !== active) {
    setActiveSection(active);
  }

  useEffect(() => {
    const { hash } = window.location;
    const id = hash ? hash.replace('#', '') : 'top';
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'auto',
      });
    }
  }, []);

  function setActiveSectionOnClick(sectionId) {
    setActiveSection(sectionId);
  }

  return (
    <ul className="no-bullet">
      {generateNavMenu(items, activeSection, setActiveSectionOnClick)}
    </ul>
  );
};

InPageNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.string,
};

InPageNav.defaultProps = {
  active: null,
};

export default InPageNav;
