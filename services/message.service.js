import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/contact`;

export const messageService = {
    sendMessage,
};

async function sendMessage(params) {
    return await fetchWrapper.post(baseUrl, params);
}
