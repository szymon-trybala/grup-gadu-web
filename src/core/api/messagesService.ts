export interface SeenByDto {
  login: string;
  id: number;
  seenAt: Date;
}

export interface MessageDto {
  id: number;
  authorId: number;
  authorLogin: string;
  chatId: number;
  chatName: string;
  createdAt: Date;
  content: string;
  seenBy: SeenByDto[];
}
