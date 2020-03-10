import React from 'react';
import {
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/display-menu.scss';

const DisplayMenu = ({ data }) => {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <ul className="display-menu">
      <ul className="no-bullet">
        {data.map(displayItem => (
          <li key={displayItem.name}>
            <h5 className="display-menu__item_title">
              <NavLink
                to={`${url}/${displayItem.path}`
                  .replace(/[/]+[/]$/g, '/')
                  .replace(/[/]$/, '')}
                exact
                activeClassName="display-menu__item_title--active"
              >
                <span className="display-menu__item_icon">
                  {displayItem.icon && displayItem.icon}
                </span>
                {displayItem.name}
              </NavLink>
            </h5>
            <Route
              path={`${url}/${displayItem.path}`}
              render={() => (
                <div className="display-menu__item_content">
                  {displayItem.itemContent}
                </div>
              )}
              exact
            />
          </li>
        ))}

        <Route
          path="/"
          exact
          render={() => {
            if (location.hash.length > 0) {
              return (
                <Route
                  path={`${displayItem.route}`}
                  render={() => (
                    <div className="display-menu__item_content">
                      {displayItem.itemContent}
                    </div>
                  )}
                  exact={displayItem.exact}
                />
              );
            }
          }}
        />
      </ul>
    </ul>
  );
};

const dataPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.element,
    path: PropTypes.string.isRequired,
    itemContent: PropTypes.element,
    mainContent: PropTypes.element,
  })
);

DisplayMenu.propTypes = {
  data: dataPropTypes.isRequired,
};

export default DisplayMenu;
