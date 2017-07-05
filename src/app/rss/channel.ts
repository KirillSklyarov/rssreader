import { Item, ItemBackend } from './item'
import { Image, ImageBackend } from './image'
import { TextInput, TextInputBackend } from './textinput'
import { Cloud, CloudBackend } from './cloud'

export interface ChannelBackend {
  title: string
  link: string
  description: string
  items: ItemBackend[]
  language: string
  copyright: string
  managingeditor: string
  webmaster: string
  pubdate: string
  lastbuilddate: string
  category: string
  generator: string
  docs: string
  cloud: CloudBackend
  ttl: number
  image: ImageBackend
  rating: string
  textinput: TextInputBackend
  skiphours: number
  skipdays: string;
}

export class Channel {
  title: string
  link: string
  description: string
  items: Item[]
  language: string
  copyright: string
  managingEditor: string
  webMaster: string
  pubDate: Date
  lastBuildDate: string
  category: string
  generator: string
  docs: string
  cloud: Cloud
  ttl: number
  image: Image
  rating: string
  textInput: TextInput
  skipHours: number
  skipDays: string

  constructor(json: ChannelBackend) {
    this.title = json.title
    this.link = json.link
    this.description = json.description
    this.language = json.language
    this.copyright = json.copyright
    this.managingEditor = json.managingeditor
    this.webMaster = json.webmaster
    this.lastBuildDate = json.lastbuilddate
    this.category = json.category
    this.generator = json.generator
    this.docs = json.docs
    this.ttl = json.ttl
    this.rating = json.rating
    this.skipHours = json.skiphours
    this.skipDays = json.skipdays

    this.items = []
    json.items.forEach((item, index) => {
      this.items[index] = new Item(item)
    })

    if (json.pubdate) { this.pubDate = new Date(json.pubdate); }

    if (json.cloud) { this.cloud = new Cloud(json.cloud) }

    if (json.image) { this.image = new Image(json.image) }

    if (json.textinput) { this.textInput = new TextInput(json.textinput) }
  }

}
