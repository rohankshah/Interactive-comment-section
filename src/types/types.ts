interface UserImage {
  png: string;
  webp: string;
}

interface User {
  image: UserImage;
  username: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Comment[];
}

interface CurrentUser {
  image: UserImage;
  username: string;
}

interface JsonData {
  currentUser: CurrentUser;
  comments: Comment[];
}

export type { UserImage, User, Comment, CurrentUser, JsonData };
