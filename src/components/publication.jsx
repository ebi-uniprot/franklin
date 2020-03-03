import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { InfoList } from './index';
import Bubble from './bubble';
import PublicationIcon from '../svg/publication.svg';
import ComputerMappedIcon from '../svg/computer-mapped.svg';
import CitedIcon from '../svg/cited.svg';
import '../styles/components/publication.scss';

const Authors = ({ authors, limit }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="publication__authors">
      {authors.reduce(
        (prev, currentAuthor, i) =>
          open || authors.length <= limit || i < limit - 1 ? (
            <Fragment>
              {prev && (
                <Fragment>
                  {prev}
                  {', '}
                </Fragment>
              )}
              <Link to="/" key={currentAuthor}>
                {currentAuthor}
              </Link>
            </Fragment>
          ) : (
            prev
          ),
        ''
      )}
      {!open && authors.length > limit && (
        <Fragment>
          <button
            className="button tertiary"
            type="button"
            onClick={() => setOpen(true)}
          >
            [...]
          </button>
          {', '}
          <Link to="/" key={authors[authors.length - 1]}>
            {authors[authors.length - 1]}
          </Link>
        </Fragment>
      )}
    </section>
  );
};

const Abstract = ({ abstract }) => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      {open ? (
        <p>{abstract}</p>
      ) : (
        <button
          className="button tertiary"
          type="button"
          onClick={() => setOpen(true)}
        >
          View abstract [...]
        </button>
      )}
    </section>
  );
};

const JournalInfo = ({ journalInfo }) => {
  const {
    journal,
    volume,
    firstPage,
    lastPage,
    publicationDate,
    doiId,
  } = journalInfo;
  return (
    <a href={`//dx.doi.org/${doiId}`}>
      {`${journal} ${volume}:${firstPage}-${lastPage}(${publicationDate})`}
    </a>
  );
};

const Statistics = ({ statistics }) => {
  const {
    reviewedProteinCount,
    unreviewedProteinCount,
    mappedProteinCount,
  } = statistics;
  const citedCount = reviewedProteinCount + unreviewedProteinCount;
  return (
    <section className="publication__statistics">
      {mappedProteinCount > 0 && (
        <section className="publication__statistics__item">
          <Link to="/">
            <section>
              <small>Mapped to</small>
            </section>
            <section className="publication__statistics__bubble">
              <Bubble
                colourClass="colour-pastel-blue"
                size="small"
                value={mappedProteinCount}
              />
              <ComputerMappedIcon width={15} height={15} />
            </section>
          </Link>
        </section>
      )}
      {citedCount && (
        <section className="publication__statistics__item">
          <Link to="/">
            <section>
              <small>Cited in</small>
            </section>
            <section className="publication__statistics__bubble">
              <Bubble
                colourClass="colour-pastel-blue"
                size="small"
                value={citedCount}
              />
              <CitedIcon width={15} height={15} />
            </section>
          </Link>
        </section>
      )}
    </section>
  );
};

const Publication = ({
  title,
  authors,
  abstract,
  journalInfo,
  infoData,
  pubmedId,
  statistics,
}) => (
  <section className="publication">
    <h4>{title}</h4>
    {authors && <Authors authors={authors} />}
    {abstract && <Abstract abstract={abstract} />}
    <section className="publication__columns">
      <section className="publication__columns__main">
        {infoData && <InfoList infoData={infoData} />}
      </section>
      <section className="publication__columns__side">
        <section className="publication__columns__side__item">
          <PublicationIcon width="1.875rem" height="2rem" />
          <ul className="no-bullet">
            {pubmedId && (
              <Fragment>
                <li>
                  <a
                    href={`//www.ncbi.nlm.nih.gov/pubmed/${pubmedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubMed
                  </a>
                </li>
                <li>
                  <a
                    href={`//europepmc.org/article/MED/${pubmedId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Europe PMC
                  </a>
                </li>
              </Fragment>
            )}
            {journalInfo && (
              <li>
                <small>
                  <JournalInfo journalInfo={journalInfo} />
                </small>
              </li>
            )}
          </ul>
        </section>
        <section className="publication__columns__side__item">
          {statistics && <Statistics statistics={statistics} />}
        </section>
      </section>
    </section>
  </section>
);

Authors.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  limit: PropTypes.number,
};

Authors.defaultProps = {
  limit: 10,
};

Abstract.propTypes = {
  abstract: PropTypes.string.isRequired,
};

JournalInfo.propTypes = {
  journalInfo: PropTypes.shape({
    publicationDate: PropTypes.string.isRequired,
    journal: PropTypes.string.isRequired,
    firstPage: PropTypes.string.isRequired,
    lastPage: PropTypes.string.isRequired,
    volume: PropTypes.string.isRequired,
    doiId: PropTypes.string.isRequired,
  }).isRequired,
};

Statistics.propTypes = {
  statistics: PropTypes.shape({
    reviewedProteinCount: PropTypes.number,
    unreviewedProteinCount: PropTypes.number,
    mappedProteinCount: PropTypes.number,
  }).isRequired,
};

Publication.propTypes = {
  /**
   * The publication title.
   */
  title: PropTypes.string.isRequired,
  /**
   * The lise of authors. Will be cut off and can be expanded.
   */
  authors: PropTypes.arrayOf(PropTypes.string),
  /**
   * The publication abstract (collapsed by default).
   */
  abstract: PropTypes.string,
  /**
   * The content of an Info List component.
   */
  infoData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    })
  ),
  /**
   * Information about the journal in which this was published.
   */
  journalInfo: JournalInfo.propTypes.journalInfo,
  /**
   * The PubMed identifier
   */
  pubmedId: PropTypes.number,
  /**
   * Number of other entries this publication is cited in
   */
  statistics: Statistics.propTypes.statistics,
};

Publication.defaultProps = {
  authors: [],
  abstract: null,
  infoData: null,
  journalInfo: null,
  pubmedId: null,
  statistics: {},
};

export default Publication;
