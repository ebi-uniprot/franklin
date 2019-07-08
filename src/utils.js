export function getLastIndexOfSubstringIgnoreCase(string, substring) {
  return string.toLowerCase().lastIndexOf(substring.toLowerCase());
}

export const getFlattenedPaths = (currentItems, id, path = []) => {
  let flattened = [];
  currentItems.forEach((node) => {
    const { items, ...thisNode } = node;
    const nodePath = [...path, thisNode];
    if (items) {
      const result = getFlattenedPaths(items, id, nodePath);
      if (result.length) {
        flattened = [...flattened, ...result];
      }
    } else if (!id || thisNode.id === id) {
      flattened = [...flattened, nodePath];
    }
  });
  return flattened;
};

export function restructureFlattenedTreeItemsForAutocomplete(items, sep = ' / ') {
  return {
    id: items[items.length - 1].id,
    pathLabel: items.map(item => item.label).join(sep),
    itemLabel: items[items.length - 1].label,
  };
}

export function restructureFlattenedTreeDataForAutocomplete(flattenedTreeData) {
  return flattenedTreeData.map(items => restructureFlattenedTreeItemsForAutocomplete(items));
}

export function formatLargeNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function serializableDeepAreEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const fillArray = (numberElements, func) =>
  Array(numberElements)
    .fill(null)
    .map((currentValue, index) => func(index));
