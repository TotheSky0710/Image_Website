import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/admin/images`;

export const imageService = {
    add,
    getAll,
    // getById,
    // update,
    // delete: _delete
};

async function add(data) {
    await fetchWrapper.post(`${baseUrl}/add`, data);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

// async function getById(id) {
//     return await fetchWrapper.get(`${baseUrl}/${id}`);
// }

// async function update(id, params) {
//     await fetchWrapper.put(`${baseUrl}/${id}`, params);
// }

// // prefixed with underscored because delete is a reserved word in javascript
// async function _delete(id) {
//     await fetchWrapper.delete(`${baseUrl}/${id}`);
// }
