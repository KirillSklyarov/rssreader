import { RssData, getRssData } from './rssdata';

export interface ImageBackend {
  url: RssData;
  title: RssData;
  link: RssData;
}

export class Image {
  url: string;
  title: string;
  link: string;

  constructor(json: ImageBackend) {
    this.url = getRssData(json.url);
    this.title = getRssData(json.title);
    this.link = getRssData(json.link);
  }
}
