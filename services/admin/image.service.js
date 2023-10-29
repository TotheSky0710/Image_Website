import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/admin/images`;

export const imageService = {
    add,
    getAll,
    delete: _delete,
    getContent
};

async function add(data) {
    await fetchWrapper.post(`${baseUrl}/add`, data);
}

async function getAll(q = '', category_id = null) {
    return await fetchWrapper.post(baseUrl, {q, category_id});
}

async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);
}

async function getContent() {
    return await fetchWrapper.get(`${publicRuntimeConfig.apiUrl}/images/1698586605767_oq5gkr.jpeg`);
}