import { RssData, getRssData } from './rssdata'

export interface ItemBackend {
  title: RssData
  link: RssData
  description: RssData
  author: RssData
  category: RssData
  comments: RssData
  enclosure: RssData
  guid: RssData
  pubDate: RssData
  source: RssData;
}

export class Item {
  title: string
  link: string
  description: string
  author: string
  category: string
  comments: string
  enclosure: string
  guid: string
  pubDate: Date
  source: string;

  constructor (json: ItemBackend) {
    this.title = getRssData(json.title)
    this.link = getRssData(json.link)
    this.description = getRssData(json.description)
    this.author = getRssData(json.author)
    this.category = getRssData(json.category)
    this.comments = getRssData(json.comments)
    this.enclosure = getRssData(json.enclosure)
    this.guid = getRssData(json.guid)
    this.source = getRssData(json.source);

    if (json.pubDate) {
      this.pubDate = new Date(getRssData(json.pubDate))
    } else {
      this.pubDate = null
    }
  }
}
