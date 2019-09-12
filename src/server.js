import './env';

import logger from 'morgan';
import { GraphQLServer } from 'graphql-yoga';
import passport from 'passport';
import { authenticateJwt } from './passport';

import schema from './schema';
import './passport';
import { isAuthenticated } from './middlewares';
import { uploadController, uploadMiddleware } from './upload';

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});
server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅  Server running on http://localhost:${PORT}`)
);
