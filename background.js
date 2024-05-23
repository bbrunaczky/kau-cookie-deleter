chrome.webNavigation.onCompleted.addListener(async (details) => {
    const url = new URL(details.url);
    if (url.hostname === "kau.gov.hu" && url.pathname === "/proxy/saml/authservice") {
	const cookies = await chrome.cookies.getAll({ domain: "kau.gov.hu" });
	for (const cookie of cookies) {
	    console.log(`Deleting cookie: ${cookie.name} (url: https://${cookie.domain}${cookie.path})`);
	    await chrome.cookies.remove({ url: `https://${cookie.domain}${cookie.path}`, name: cookie.name });
	}
    }
}, { url: [{ urlMatches: 'https://kau.gov.hu/proxy/saml/authservice' }] });
