module.exports = function getRoutingFileInfo(isTopLevel, modulePath) {
  const prefix = 'src/app';
  const suffix = '-routing.module.ts';
  const defaultPath = `${prefix}${modulePath}${suffix}`;

  const pathInfo = {
    path: defaultPath,
    fileName: modulePath.replace(/^\//, '') + suffix
  };

  if (isTopLevel) {
    const args = process.argv.slice();
    const targetArg = '--topLevelRouteFile';

    args.forEach((arg, index) => {
      if (arg === targetArg) {
        pathInfo.path = args[index + 1];
      } else if (arg.includes(`${targetArg}=`)) {
        pathInfo.path = arg.split('=')[1];
      }
    });
  }

  return pathInfo;
};
