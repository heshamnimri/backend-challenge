export function deepEqual(x: any, y: any): any {
  const ok = Object.keys; const tx = typeof x; const
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length
      && ok(x).every((key) => deepEqual(x[key], y[key]))
  ) : (x === y);
}

// Recursively count number of action in for each
export function getNumberChildren(element: any, count = 0) {
  if (element.children.length) {
    count += 1;
    count = getNumberChildren(element.children[0], count);
    return count;
  }
  return count - 1;
}
