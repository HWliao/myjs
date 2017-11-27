import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL || '';

function ensureSlash(p, needsSlash) {
  const hasSlash = p.endsWith('/');
  if (hasSlash && !needsSlash) {
    return p.substr(p, p.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${p}/`;
  }
  return p;
}

export default {
  appRoot: appDirectory,
  appBuild: resolveApp('build'),
  appHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appVender: resolveApp('src/vender'),
  appPolyfillJs: resolveApp('src/polyfill.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: envPublicUrl,
  servedPath: ensureSlash(envPublicUrl, true),
};
