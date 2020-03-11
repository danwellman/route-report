const ts = require('typescript');

module.exports = function getRoutesArray(startNode) {
  let array;
  startNode.forEachChild(variableDeclarationList => {
    variableDeclarationList.forEachChild(variableDeclaration => {
      variableDeclaration.forEachChild(child => {
        if (ts.SyntaxKind[child.kind] === 'ArrayLiteralExpression') {
          array = child;
        }
      });
    });
  });

  return array;
}
