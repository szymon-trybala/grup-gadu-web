export interface ChatsRefreshError {
  errorMessage: string;
}

export interface ChatsState {
  chats: Chat[];
  promise: "initial" | "pending" | "error" | "fulfilled";
  error: string | undefined;
}

export interface Chat {
  id: number;
  name: string;
  createdAt: Date;
  owner: Member;
  members: Member[];
}

export interface Member {
  login: string;
  id: number;
}
