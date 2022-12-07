class PlausibleAnalyticsIntegrationPlugin {
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
			let scriptURL = this.config.scriptURL;
			
			if (!scriptURL || scriptURL.trim() === '') {
				scriptURL = 'https://plausible.io/js/plausible.js';
			}
		
			scriptToLoad = `
				<script 
					defer 
					type="${cookieBannerGroup}"
					data-domain="${this.config.domain}" 
					src="${scriptURL}"></script>
			`;
		}

		return scriptToLoad;
	}
}

module.exports = PlausibleAnalyticsIntegrationPlugin;