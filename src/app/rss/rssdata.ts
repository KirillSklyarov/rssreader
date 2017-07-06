export interface RssData {
  _text: string
  _cdata: string;
}

export function getRssData(rssData: RssData): string {

  // Return rssData._text or rssData._cdata
  if (rssData) {
    if ('_text' in rssData) { return rssData._text}
    if ('_cdata' in rssData) { return rssData._cdata}
  }
  return null
}
