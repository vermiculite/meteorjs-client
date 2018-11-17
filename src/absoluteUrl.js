
function getProtocol(url, secure) {

  if (url.match('localhost') || url.match('127.0.0.1')) {
    return url.startsWith('https') ? 'https' : 'http';
  }

  if (secure) {
    return 'https';
  }

  return url.startsWith('https') ? 'https' : 'http';
}

function appendHttpPrefix(url, secure) {
  const protocol = getProtocol(url, secure);
  console.log(protocol, secure);
  if (url && url.match('http[s]?://.*')) {
    return url.replace(/^http[s]?/, protocol);
  }
  return `${protocol}://${url}`;
}

function appendTrailingSlashes(url) {
  if (url.lastIndexOf('/') === url.length - 1) {
    return url;
  }
  return `${url}/`;
}

function appendPath(root, path) {
  if (path && path.toLocaleLowerCase) {
    const cleanPath = path.charAt(0) == '/' ? path.substring(1) : path;
    return `${root}${cleanPath}`;
  }
  return root;
}

function doReplaceLocalhost(url, replaceLocalhost) {
  if(replaceLocalhost) {
    console.log('In replace localhost')
    return url.replace('://localhost', '://127.0.0.1')
  }
  return url;
}

module.exports = function(path, options) {
  const pathOrOptions = options || path;
  const { rootUrl, secure, replaceLocalhost } = pathOrOptions;
  const withPrefix = appendHttpPrefix(rootUrl, secure);
  const withTrailing = appendTrailingSlashes(withPrefix);
  const withPath = appendPath(withTrailing, path);
  const withLocalhostReplaced = doReplaceLocalhost(withPath, replaceLocalhost)
  return withLocalhostReplaced;
};