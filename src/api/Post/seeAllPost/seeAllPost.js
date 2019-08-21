import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeAllPost: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      return prisma.posts();
    }
  }
};
