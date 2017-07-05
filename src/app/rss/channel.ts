import { Item } from './item'
import { Image } from './image'
import { TextInput } from './textinput'

export class Channel {
  // Required channel elements
  title: string
  link: string
  description: string

  // Optional channel elements
  language: string
  copyright: string
  managingEditor: string
  webMaster: string
  pubDate: string
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
