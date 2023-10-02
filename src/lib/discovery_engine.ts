const RECAPCHA_TOKEN = '6Le5-BQmAAAAAMs1Nbm38roKdHBAXiPEt1cd8xjf';
const ENDPOINT = 'https://content-discoveryengine.googleapis.com/v1alpha';
const PROJECT_NUMBER = '773817141157';
const DATA_STORE_ID = 'dora-dev-search_1695873829361';
const COLLECTION = 'default_collection';

declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: Function) => void;
			execute: (key: string, options: { fast?: boolean; action: string }) => Promise<string>;
		};
	}
}

export async function lookupWidgetConfig(widgetConfigId: string, location: string = 'global') {
	const url = `${ENDPOINT}/locations/${location}/lookupWidgetConfig`;
	const response = await fetch(url, {
		body: `{"widgetConfigId": "${widgetConfigId}"}`,
		method: 'POST'
	});

	return response.json();
}

export async function widgetConverseConversation(
	widgetConfigId: string,
	input: string,
	conversationId: string = '-',
	location: string = 'global'
) {
	3;
	const conversationName = `projects/${PROJECT_NUMBER}/locations/${location}/collections/${COLLECTION}/dataStores/${DATA_STORE_ID}/conversations/${conversationId}`;

	if (!window.grecaptcha) {
		return undefined;
	}

	const uToken = await window.grecaptcha.execute(RECAPCHA_TOKEN, {
		action: 'WidgetService'
	});

	const url = `${ENDPOINT}/locations/${location}/widgetConverseConversation`;
	const body = JSON.stringify({
		configId: widgetConfigId,
		converseConversationRequest: {
			name: conversationName,
			query: { input: input }
		},
		conversationId: conversationId,
		additionalParams: {
			token: uToken
		}
	});
	const response = await fetch(url, {
		body: body,
		method: 'POST'
	});

	return response.json();
}
