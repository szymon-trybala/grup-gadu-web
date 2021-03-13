import { User } from "../contacts/types";

export interface Group {
  id: number;
  name: string;
  members: User[];
  admin: User;
  unread: number;
}
