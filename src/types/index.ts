export interface INewBase {
  title: string;
  summary: string;
  imageUrl: string;
  url: string;
  newsSite: string;
}

export interface INew extends INewBase {
  id: string;
  publishedAt: string;
}
