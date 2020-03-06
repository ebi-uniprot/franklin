import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import smoothscroll from 'smoothscroll-polyfill';
import '../styles/components/in-page-nav.scss';

smoothscroll.polyfill();

function onScrollSection(sectionId) {
  // console.log("section scrolling:", sectionId);
}

function onVisibleSection(sectionId, isVisible) {
  // console.log("section visibilty:", sectionId, isVisible);
}

function generateNavMenu(items, active, onClick) {
  const navItems = items.map(item => {
    const { pathname, hash } = document.location;
    const currentPage = `${pathname}${hash}`;
    let classNames = [];

    // If no item is 'active' by scroll or click events triggered by the user,
    // check if the item's 'to' value is matching the current page address. If
    // it does match, then highlight this menu item by manually calling the 'onClick'
    // callback on this item.
    if (currentPage === item.to && !active) {
      onClick(item.section);
    }

    // The 'NavHashLink' from react-router-hash-link does NOT work with auto-highlight
    // and a few other things as well, so we have to do use the 'HashLink' and do some
    // manual work to handle the active elements.
    if (active === item.section) {
      classNames.push('in-page-nav--active');
    }

    return (
      <li className={classNames.join(' ')}>
        <HashLink
          to={item.to}
          id={item.id}
          onClick={() => {
            console.log('hash link clicked');
            onClick(item.section);
          }}
        >
          {item.label}
        </HashLink>
      </li>
    );
  });

  return <ul className="in-page-nav">{navItems}</ul>;
}

const InPageNav = ({ items, active, onClick }) => {
  const [activeSection, setActiveSection] = useState(null);
  // console.log("+ new active section:", active);

  useEffect(() => {
    const { hash } = window.location;
    const id = hash ? hash.replace('#', '') : 'top';
    const element = document.getElementById(id);
    console.log('scroll to hash:', element);
    if (element) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, []);

  function sectionVisibilityCheck(elId, rect) {
    console.log('vis check:', elId, rect);
    if (!rect || activeSection === elId) {
      setActiveSection(null);
      return false;
    }

    const { top, bottom } = rect;
    // console.log("rect:", elId, rect);
    // const clientHeight = document.documentElement.clientHeight;

    if (top < 50 && bottom > 50) {
      // || (top < clientHeight && bottom > clientHeight - 50)

      // console.log("visible item:", elId);

      if (activeSection !== elId) {
        setActiveSection(elId);
      }

      return true;
    }

    return false;
  }

  function setActiveSectionOnClick(sectionId) {
    setActiveSection(sectionId);
  }

  return (
    <ul className="no-bullet">
      {/* generateNavMenu(items, active, onClick) */}
      {generateNavMenu(items, activeSection, setActiveSectionOnClick)}
    </ul>
  );
};

InPageNav.propTypes = {
  // sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

InPageNav.defaultProps = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InPageNav;
