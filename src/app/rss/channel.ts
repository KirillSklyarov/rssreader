import { Item, ItemBackend } from './item';
import { Image, ImageBackend } from './image';
import { TextInput, TextInputBackend } from './textinput';
import { Cloud, CloudBackend } from './cloud';
import { RssData, getRssData } from './rssdata';
import { BackendChannelInfo } from './../rss/backendchannelinfo';

export interface ChannelBackend {
  title: RssData;
  link: RssData;
  description: RssData;
  item: ItemBackend[];
  language: RssData;
  copyright: RssData;
  managingEditor: RssData;
  webMaster: RssData;
  pubDate: RssData;
  lastBuildDate: RssData;
  category: RssData;
  generator: RssData;
  docs: RssData;
  cloud: CloudBackend;
  ttl: RssData;
  image: ImageBackend;
  rating: RssData;
  textInput: TextInputBackend;
  skipHours: RssData;
  skipDays: RssData;
}

export class Channel {
  backendChannelInfo: BackendChannelInfo;
  title: string;
  link: string;
  description: string;
  items: Item[];
  language: string;
  copyright: string;
  managingEditor: string;
  webMaster: string;
  pubDate: Date;
  lastBuildDate: Date;
  category: string;
  generator: string;
  docs: string;
  cloud: Cloud;
  ttl: number;
  image: Image;
  rating: string;
  textInput: TextInput;
  skipHours: number;
  skipDays: string;

  constructor(json: ChannelBackend, channelInfo: BackendChannelInfo) {
    this.title = getRssData(json.title);
    this.link = getRssData(json.link);
    this.description = getRssData(json.description);
    this.language = getRssData(json.language);
    this.copyright = getRssData(json.copyright);
    this.managingEditor = getRssData(json.managingEditor);
    this.webMaster = getRssData(json.webMaster);
    this.category = getRssData(json.category);
    this.generator = getRssData(json.generator);
    this.docs = getRssData(json.docs);
    this.rating = getRssData(json.rating);
    this.skipDays = getRssData(json.skipDays);

    this.items = [];
    json.item.forEach((singleItem, index) => {
      this.items[index] = new Item(singleItem);
    });

    if (json.pubDate) {
      this.pubDate = new Date(getRssData(json.pubDate));
    } else {
      this.pubDate = null;
    }

    if (json.lastBuildDate) {
      this.lastBuildDate = new Date(getRssData(json.lastBuildDate));
    } else {
      this.lastBuildDate = null;
    }

    if (json.cloud) {
      this.cloud = new Cloud(json.cloud);
    } else {
      this.cloud = null;
    }

    if (json.image) {
      this.image = new Image(json.image);
    } else {
      this.image = null;
    }

    if (json.textInput) {
      this.textInput = new TextInput(json.textInput);
    } else {
      this.textInput = null;
    }

    if (json.ttl) {
      this.ttl = Number(getRssData(json.ttl));
    } else {
      this.ttl = null;
    }

    if (json.skipHours) {
      this.skipHours = Number(getRssData(json.skipHours));
    } else {
      this.skipHours = null;
    }

    this.backendChannelInfo = channelInfo;
  }
}

export function parseRss(rss: string, info: BackendChannelInfo):
  Channel {

  // Deserialization RSS to Cannel object
  const convert = require('xml-js');
  const rssJson = JSON.parse(convert.xml2json(rss, {compact: true}));
  return new Channel(rssJson.rss.channel, info);
}
