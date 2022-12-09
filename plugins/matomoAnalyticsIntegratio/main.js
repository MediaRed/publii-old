class MatomoAnalyticsIntegrationPlugin {
	constructor (API, name, config) {
		this.API = API;
		this.name = name;
		this.config = config;
	}

	addInsertions () {
		this.API.addInsertion('publiiHead', this.addHeadCode, 1, this);
	}

	addHeadCode (rendererInstance) {
		let scriptToLoad = '';
		let cookieBannerGroup = 'text/javascript';

		if (this.config.cookieBannerIntegration) {
			cookieBannerGroup = 'gdpr-blocker/' + this.config.cookieBannerGroup.trim();
		}

		if (!rendererInstance.previewMode || this.config.previewMode) {
			scriptToLoad = `
				<script 
					type="${cookieBannerGroup}">
					var _paq = window._paq = window._paq || [];
					_paq.push(['trackPageView']);
					_paq.push(['enableLinkTracking']);
					(function() {
					  var u="${this.config.matomoURL}";
					  _paq.push(['setTrackerUrl', u+'matomo.php']);
					  _paq.push(['setSiteId', '${this.config.containerID}']);
					  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
					  g.async=true; g.src='${this.config.matomoURL}/matomo.js'; s.parentNode.insertBefore(g,s);
					})();
				</script>
			`;
		}

		return scriptToLoad;
	}
}

module.exports = MatomoAnalyticsIntegrationPlugin;
