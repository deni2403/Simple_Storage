import SequelizeStore from 'connect-session-sequelize';
import session from 'express-session';
import { sequelize } from './database.js';

const SessionStore = SequelizeStore(session.Store);
const store = new SessionStore({
  db: sequelize,
});

store.sync();
export default store;
