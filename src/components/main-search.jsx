import { useMemo } from 'react';
import PropTypes from 'prop-types';

import DropdownButton from './dropdown-button';
import Button from './button';

import color from '../styles/_colours.scss';

import '../styles/components/main-search.scss';

const MainSearch = ({
  searchTerm = '',
  namespaces = {},
  onChange,
  onSubmit,
  onNamespaceChange = () => null,
  selectedNamespace = 'uniprotkb',
}) => {
  const style = useMemo(
    () => ({
      '--main-button-color': color[selectedNamespace] || color.colourUniprotkb,
    }),
    [selectedNamespace]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="main-search"
      data-testid="main-search-form"
      style={style}
    >
      {Object.keys(namespaces).length > 0 && (
        <DropdownButton label={namespaces[selectedNamespace]}>
          {(setShowMenu) => (
            <ul>
              {Object.keys(namespaces).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onNamespaceChange(key);
                    }}
                  >
                    {namespaces[key]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DropdownButton>
      )}
      <input
        type="text"
        className="main-search__input"
        data-testid="main-search-input"
        onChange={(e) => onChange(e.target.value)}
        value={searchTerm}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

MainSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  namespaces: PropTypes.objectOf(PropTypes.string),
  onNamespaceChange: PropTypes.func,
  selectedNamespace: PropTypes.string,
};

MainSearch.defaultProps = {
  searchTerm: '',
  namespaces: {},
  onNamespaceChange: () => null,
  selectedNamespace: '',
};

export default MainSearch;
