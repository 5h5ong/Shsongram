import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
