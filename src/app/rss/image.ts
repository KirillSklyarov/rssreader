export interface ImageBackend {
  url: string
  title: string
  link: string;
}

export class Image {
  url: string
  title: string
  link: string;

  constructor(json: ImageBackend) {
    this.url = json.url
    this.title = json.title
    this.link = json.link;
  }
}
