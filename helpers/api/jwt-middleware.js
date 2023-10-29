import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate',
            '/api/categories',
            /^\/api\/categories\/.*$/,
            '/api/images',
            /^\/api\/images\/.*$/,
            '/api/images/uploads',
            /^\/api\/images\/uploads\/.*$/,
            '/api/contact'
        ]
    });

    return util.promisify(middleware)(req, res);
}