import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId } = args;
      const canSee = await prisma.$exists.room({
        AND: [
          { id: roomId },
          {
            participants_some: { id: user.id }
          }
        ]
      });
      console.log('canSee: ', canSee);
      if (canSee) {
        return prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error('해당 대화방에 속해있지 않습니다.');
      }
    }
  }
};
