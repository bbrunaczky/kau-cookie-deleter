chrome.webNavigation.onCompleted.addListener(function(details) {
    const url = new URL(details.url);
    const targetUrlOrigin = "https://kau.gov.hu"; // Replace with your target URL
    const pathName = "/proxy/saml/authservice";
    const targetCookieName = "IDS_SSO_ID"; // Replace with the cookie name you want to delete

    console.log(`url.origin: ${url.origin}`);
    console.log(`url.pathname: ${url.pathname}`);
    console.log(`url.search: ${url.search}`);

    if (url.origin === targetUrlOrigin && url.pathname == pathName) {
	chrome.cookies.remove({
	    url: targetUrlOrigin,
	    name: targetCookieName
	}, function(deletedCookie) {
	    if (deletedCookie) {
		console.log(`Deleted cookie: ${targetCookieName}`);
	    } else {
		console.log(`No cookie found with name: ${targetCookieName}`);
	    }
	});
    }
}, {
    url: [{urlMatches: "https://kau.gov.hu/proxy/saml/authservice*"}] // Replace with your target URL pattern
});
