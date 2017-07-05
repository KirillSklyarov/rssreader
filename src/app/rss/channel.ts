import { Item } from './item'
import { Image } from './image'
import { TextInput } from './textinput'

export class Channel {
  title: string
  link: string
  description: string
  items: Item[]
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
  image: Image
  rating: string
  textInput: TextInput
  skipHours: number
  skipDays: string
}
