import { User } from "../../common/models/user.model";
import Tag from "./tag.model";
import Comment from "./comment.model";

export default interface Post {
  id: number;
  uuid: string;
  title: string;
  created_by: User;
  content: string;
  tags: Tag[];
  likes: number;
  comments: Comment[];
}
