import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      console.log(`request user: ${user.id}`);
      console.log(`parent user: ${parent.username}`);
      try {
        const exsists = await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }]
        });
        console.log(exsists);
        if (exsists) {
          return true;
        } else {
          return false;
        }
      } catch {
        console.log(err);
        return false;
      }
    },
    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
