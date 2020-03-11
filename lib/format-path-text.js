module.exports = function formatPathText(node, routesArray, topLevel, pathPrefix) {
  const route = {};

  switch (node.text) {
    case '':
      if (topLevel) {
        route.path = '/ (root)';
        routesArray.unshift(route);
      }
      break;
    case '**':
      route.path = '** (not found)';
      routesArray.push(route);
      break;
    default:
      if (pathPrefix) {
        console.log(node.text)
        route.path = `${pathPrefix}/${node.text}`;
        routesArray.push(route);
      } else {
        route.path = `/${node.text}`;
        routesArray.push(route);
      }
  }

  return routesArray;
}
