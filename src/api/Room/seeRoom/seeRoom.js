import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId } = args;
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id }
      });
      if (canSee) {
        return prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error('어느 대화방에도 속해있지 않습니다.');
      }
    }
  }
};
