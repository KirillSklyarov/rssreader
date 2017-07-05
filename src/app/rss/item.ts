export interface ItemBackend {
  title: string[]
  link: string[]
  description: string[]
  author: string[]
  category: string[]
  comments: string[]
  enclosure: string[]
  guid: string[]
  pubDate: string[]
  source: string[];
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
    this.title = json.title[0]
    this.link = json.link[0]
    this.description = json.description[0]
    this.author = json.author[0]
    this.category = json.category[0]
    this.comments = json.comments[0]
    this.enclosure = json.enclosure[0]
    this.guid = json.guid[0]
    this.pubDate = new Date(json.pubDate[0])
    this.source = json.source[0]
}
