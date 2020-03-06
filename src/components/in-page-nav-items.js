// Just to create an array of the in-page navigation items.
// Note: these are NOT react components.

const navHashLink = (label, to) => ({
  label,
  to,
  id: `${label.replace(/\s+/g, '-').toLowerCase()}-hash-link`,
  section: `${label.replace(/\s+/g, '-').toLowerCase()}`,
});

const inPageNavItems = [
  navHashLink('First Section', '#first-section'),
  navHashLink('Second Section', '#second-section'),
  navHashLink('Third Section', '#third-section'),
];

export default inPageNavItems;
