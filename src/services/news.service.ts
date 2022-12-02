import type { INew } from "@/types";

export async function getNews(
  limit: number,
  start: number,
  query: string | null
): Promise<INew[]> {
  let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}&_start=${start}`;

  if (query) {
    url += `&_q=${query}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const news = await response.json();

  news.forEach((item: INew, i: number) => (news[i].id = item.id.toString()));

  return news as INew[];
}

export async function getSingleNew(id: string): Promise<INew> {
  const url = `https://api.spaceflightnewsapi.net/v3/articles/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const singleNew = await response.json();

  singleNew.id = singleNew.id.toString();

  return singleNew as INew;
}
