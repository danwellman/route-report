const ts = require('typescript');
const fs = require('fs');

module.exports = function(fileName, routingFilePath) {
  return ts.createSourceFile(
    fileName,
    fs.readFileSync(routingFilePath).toString(),
    ts.ScriptTarget.Latest
  );
}
