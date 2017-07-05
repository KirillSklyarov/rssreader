export interface ItemBackend {
  title: string
  link: string
  description: string
  author: string
  category: string
  comments: string
  enclosure: string
  guid: string
  pubDate: string
  isoDate: string
  source: string;
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
  pubDate: string
  isoDate: Date
  source: string;

  constructor (json: ItemBackend) {
    this.title = json.title
    this.link = json.link
    this.description = json.description
    this.author = json.author
    this.category = json.category
    this.comments = json.comments
    this.enclosure = json.enclosure
    this.guid = json.guid
    this.pubDate = json.pubDate
    this.isoDate = new Date(json.isoDate)
    this.source = json.source
  }
}
