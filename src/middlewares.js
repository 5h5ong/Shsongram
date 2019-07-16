export const isAuthenticated = request => {
  if (!request.user) {
    throw Error('해당 작업을 진행하려면 login해야 합니다.');
  }
};
