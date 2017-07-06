import { RssData, getRssData } from './rssdata'

export interface TextInputBackend {
  title: RssData
  description: RssData
  name: RssData
  link: RssData;
}

export class TextInput {
  title: string
  description: string
  name: string
  link: string;

  constructor(json: TextInputBackend) {
    this.title = getRssData(json.title)
    this.description = getRssData(json.description)
    this.name = getRssData(json.name)
    this.link = getRssData(json.link);
  }
}
