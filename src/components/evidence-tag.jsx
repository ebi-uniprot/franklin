import React, { Fragment, useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import EvidenceTagIcon from '../svg/evidence-tag.svg';
import '../styles/components/evidence-tag.scss';

const size = 12;

const EvidenceTag = ({ label, title, className, iconComponent, children }) => {
  const [contentDisplay, setContentDisplay] = useState(false);
  return (
    <Fragment>
      <span
        className={`evidence-tag ${className}`}
        onClick={() => setContentDisplay(!contentDisplay)}
        onKeyDown={() => setContentDisplay(!contentDisplay)}
        role="button"
        tabIndex={0}
        data-testid="evidence-tag-trigger"
      >
        {cloneElement(iconComponent, { width: size, height: size })}
        <span className="evidence-tag__label" title={title}>
          {label}
        </span>
      </span>
      {children && (
        <div
          className={`evidence-tag-content ${
            contentDisplay ? 'evidence-tag-content--visible' : ''
          }`}
          data-testid="evidence-tag-content"
        >
          {children}
        </div>
      )}
    </Fragment>
  );
};

EvidenceTag.propTypes = {
  /**
   * Displayed on the tag
   */
  label: PropTypes.string.isRequired,
  /**
   * Displayed on on mouseover
   */
  title: PropTypes.string,
  /**
   * Decides the colour of the tag
   */
  className: PropTypes.string,
  /**
   * Decides the colour of the tag
   */
  iconComponent: PropTypes.element,
  /**
   * The content of the tag
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

EvidenceTag.defaultProps = {
  title: '',
  className: '',
  iconComponent: <EvidenceTagIcon />,
  children: null,
};

export default EvidenceTag;
