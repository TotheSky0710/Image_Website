import getConfig from 'next/config';
import mongoose from 'mongoose';

import { User, Category, Image } from '../../models';

const { serverRuntimeConfig } = getConfig();

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User,
    Category,
    Image
};