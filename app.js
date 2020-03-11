const getRoutingFileInfo = require('./lib/get-routing-file-info');
const createSourceFile = require('./lib/create-source-file');
const getFirstStatement = require('./lib/get-first-statement');
const nodeContainsPathValue = require('./lib/node-contains-path-value');
const getRoutesArray = require('./lib/get-routes-array');
const formatPathText = require('./lib/format-path-text');
const extractChildModulePath = require('./lib/extract-child-module-path');

let routes = [];

const topLevelRoutingFileInfo = getRoutingFileInfo(true, '/app');
const topLevelRoutingFile = createSourceFile(topLevelRoutingFileInfo.fileName, topLevelRoutingFileInfo.path);
const topLevelFirstStatement = getFirstStatement(topLevelRoutingFile);
const topLevelRoutesArray = getRoutesArray(topLevelFirstStatement);

processRoutesArray(topLevelRoutesArray, true);

function processRoutesArray(arrayNode, topLevel, path) {
  arrayNode.forEachChild(routeObject => {
    routeObject.forEachChild(routeChild => {
      routeChild.forEachChild(propertyAssignment => {
        if (nodeContainsPathValue(routeChild, propertyAssignment)) {
          routes = formatPathText(propertyAssignment, routes, topLevel, path);
        }

        if (routeChild.name.escapedText === 'loadChildren') {
          const childRoutingModulePath = extractChildModulePath(propertyAssignment);
          if (childRoutingModulePath) {
            const childRoutingModulePathParts = childRoutingModulePath.split('/');
            const childRoutingFileInfo = getRoutingFileInfo(false, `${childRoutingModulePath}`);
            const childRoutingFile = createSourceFile(childRoutingFileInfo.fileName, childRoutingFileInfo.path);
            const childFirstStatement = getFirstStatement(childRoutingFile);
            const childRoutesArray = getRoutesArray(childFirstStatement);
            processRoutesArray(childRoutesArray, false, `/${childRoutingModulePathParts[1]}`);
          }
        }
      });
    });
  });
}

console.log(routes)
