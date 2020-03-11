const ts = require('typescript');

module.exports = function getFirstStatement(file) {
  let firstStatement;
  file.forEachChild(child => {
    if (ts.SyntaxKind[child.kind] === 'FirstStatement') {
      firstStatement = child;
    }
  });

  return firstStatement;
}
