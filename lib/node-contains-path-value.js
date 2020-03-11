const ts = require('typescript');

module.exports = function nodeContainsPathValue(node, propertyAssignmentNode) {
  return node.name.escapedText === 'path'
    && ts.SyntaxKind[propertyAssignmentNode.kind] === 'StringLiteral';
}
