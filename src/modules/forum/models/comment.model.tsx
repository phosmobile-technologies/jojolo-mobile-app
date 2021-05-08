import { User } from "../../common/models/user.model";

export default interface Comment {
  id: number;
  uuid: string;
  content: string;
  likes: number;
  comments?: Comment[];
  user: User;
}
