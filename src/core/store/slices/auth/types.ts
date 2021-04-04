import { UserDto } from "../../../api/authService";

export interface Auth {
  user: UserDto | undefined;
}
