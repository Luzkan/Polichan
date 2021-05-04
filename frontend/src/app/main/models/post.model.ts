export interface Post {
  id: string,
  threadId: string,
  nickname: string,
  content: string,
  imgUrl?: string,
  date: Date,
}
