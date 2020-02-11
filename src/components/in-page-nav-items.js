// Just to create an array of the in-page navigation items.
// Note: these are NOT react components.

const navLink = (label, to, children) => ({
  label,
  to,
  children,
  type: "link",
  id: `${label.replace(/\s+/g, "-").toLowerCase()}-nav-link`
});

const navHashLink = (label, to) => ({
  label,
  to,
  type: "hash",
  id: `${label.replace(/\s+/g, "-").toLowerCase()}-hash-link`,
  section: `${label.replace(/\s+/g, "-").toLowerCase()}`
});

export const inPageNavItems = [
  navLink("Home", "/home", [
    navHashLink("First Section", "/home#first-section"),
    navHashLink("Second Section", "/home#second-section"),
    navHashLink("Third Section", "/home#third-section")
  ]),
  navLink("About", "/about"),
  navLink("Contact", "/contact")
];
