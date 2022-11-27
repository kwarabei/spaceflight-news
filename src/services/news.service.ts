import type { INew } from "@/types";

export async function getNews(limit: number, start: number): Promise<INew[]> {
  const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}&_start=${start}`;

  const response = await fetch(url);

  if (!response.ok) {
    // TODO handle error
    return [];
  }

  const news = await response.json();

  return news as INew[];
}

export async function getSingleNew(id: string): Promise<INew> {
  const url = `https://api.spaceflightnewsapi.net/v3/articles/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    // TODO handle error
    return {} as INew;
  }

  const singleNew = await response.json();

  return singleNew as INew;
}
