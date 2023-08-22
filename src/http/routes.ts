import { FastifyInstance } from 'fastify';
import { createHouse, findHouseById } from './controllers/house/house.controller';
import { accept, createRule, findByHouseId } from './controllers/rule/rule.controller';
import { authenticate } from './controllers/user/auth.controller';
import { findUserById, register } from './controllers/user/user.controller';
import { verifyJWT } from './middlwares/verify.jwt';
import { verifyIsAdmin } from './middlwares/verify-is-admin';
import { createExpense, findByExpenseId } from './controllers/expense/expense.controller';

export async function appRoutes(app: FastifyInstance) {

    //user routes
    app.post('/user', register);

    app.post('/user/authenticate', authenticate);

    /** Authenticated */

    app.get('/user/:id', { onRequest: [verifyJWT] }, findUserById);

    //house routes
    app.post('/house', { onRequest: [verifyJWT, verifyIsAdmin] }, createHouse);
    app.get('/house/:id', { onRequest: [verifyJWT] }, findHouseById);

    //Rules routes
    app.post('/:houseId/rule', { onRequest: [verifyJWT] }, createRule);
    app.get('/rule/:houseId', { onRequest: [verifyJWT] }, findByHouseId);
    app.put('/rule/accept/:ruleId', { onRequest: [verifyJWT] }, accept);

    //Expenses Routes
    app.post('/:houseId/expense', { onRequest: [verifyJWT] }, createExpense);
    app.get('/expense/:houseId', { onRequest: [verifyJWT] }, findByExpenseId);
}