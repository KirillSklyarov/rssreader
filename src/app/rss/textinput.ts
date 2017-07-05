export interface TextInputBackend {
  title: string
  description: string
  name: string
  link: string;
}

export class TextInput {
  title: string
  description: string
  name: string
  link: string;

  constructor(json: TextInputBackend) {
    this.title = json.title
    this.description = json.description
    this.name = json.name
    this.link = json.link;
  }
}
