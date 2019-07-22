export const COMMENT_FRAGMENT = `
  fragment commentParts on Comment {
    id
    text
    user {
      username
    }
  } 
`;
