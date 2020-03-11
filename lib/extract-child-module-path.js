const ts = require('typescript');

module.exports = function extractChildModulePath(node) {
  let path;
  node.forEachChild(childNode => {
    if (ts.SyntaxKind[childNode.kind] === 'CallExpression') {
      childNode.forEachChild(subChildNode => {
        if (ts.SyntaxKind[subChildNode.kind] === 'PropertyAccessExpression') {
          subChildNode.forEachChild(nestedCallExpression => {
            if (nestedCallExpression.arguments) {
              const baseText = nestedCallExpression.arguments[0].text;
              const childModulePath = `${baseText}.ts`;
              const childRoutingModulePathParts = childModulePath.split('.');

              path = childRoutingModulePathParts[1];
            }
          });
        }
      });
    }
  });

  return path;
}
