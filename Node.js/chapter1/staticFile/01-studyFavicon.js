/**
 * The favicon gotcha
 * When using a browser to test our server, sometimes an unexpected server hit can be
 * observed. This is the browser requesting the default favicon.ico icon file that servers can
 * prvide. Apart from the initial confusion of seeing additional hits, this is usually not a problem.
 * If the favicon request does begin to interfere, we can handle it as follows:
 */

if (request.url === '/favicon.ico') {
	console.log('Not found: ' + f);
	response.end();
	return;
}