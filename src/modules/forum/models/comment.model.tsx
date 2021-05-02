export default interface Comment {
  id: number;
  uuid: string;
  content: string;
  likes: number;
  comments?: Comment[];
}
