import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/images`;

export const userImageService = {
    getAll,
    getById,
    download
};

async function getAll(q = '', category_id = null) {
    return await fetchWrapper.post(baseUrl, {q, category_id});
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function download(id) {
    return await fetchWrapper.get(`${baseUrl}/download/${id}`);
}

