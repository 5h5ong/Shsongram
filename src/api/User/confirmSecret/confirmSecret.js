import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        return generateToken(user.id);
      } else {
        throw Error('잘못된 login secret key 입니다.');
      }
    }
  }
};
