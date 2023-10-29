import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/categories`;

export const userCategoryService = {
    getAll,
    getById,
    getAllWithImagesCount
};

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function getAllWithImagesCount() {
    return await fetchWrapper.get(`${baseUrl}/withImageCount`);
}
