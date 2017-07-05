import { Item, ItemBackend } from './item'
import { Image, ImageBackend } from './image'
import { TextInput, TextInputBackend } from './textinput'

export interface ChannelBackend {
  title: string
  link: string
  description: string
  entries: ItemBackend[]
  language: string
  copyright: string
  managingEditor: string
  webMaster: string
  pubDate: string
  isoDate: string
  lastBuildDate: string
  category: string
  generator: string
  docs: string
  cloud: any
  ttl: number
  image: ImageBackend
  rating: string
  textInput: TextInputBackend
  skipHours: number
  skipDays: string;
}

export class Channel {
  title: string
  link: string
  description: string
  language: string
  copyright: string
  managingEditor: string
  webMaster: string
  pubDate: string
  lastBuildDate: string
  category: string
  generator: string
  docs: string
  ttl: number
  rating: string
  skipHours: number
  skipDays: string
  items: Item[]
  image: Image
  textInput: TextInput
  isoDate: Date;

  constructor(json: ChannelBackend) {
    this.title = json.title
    this.link = json.link
    this.description = json.description
    this.language = json.language
    this.copyright = json.copyright
    this.managingEditor = json.managingEditor
    this.webMaster = json.webMaster
    this.pubDate = json.pubDate
    this.lastBuildDate = json.lastBuildDate
    this.category = json.category
    this.generator = json.generator
    this.docs = json.docs
    this.ttl = json.ttl
    this.rating = json.rating
    this.skipHours = json.skipHours
    this.skipDays = json.skipDays

    json.entries.forEach((entry, index) => {
      this.items[index] = new Item(entry)
    })

    this.textInput = new TextInput(json.textInput)

    this.image = new Image(json.image)

    this.isoDate = new Date(json.isoDate);

  }

}
