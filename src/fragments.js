export const USER_FRAGMENT = `
  fragment abcd on User {
    id
    username
    email
    firstName
    lastName
    bio
    posts {
      id
      caption
      location
    }
  }
`;
