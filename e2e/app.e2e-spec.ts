import { RssreaderPage } from './app.po';

describe('rssreader App', function() {
  let page: RssreaderPage;

  beforeEach(() => {
    page = new RssreaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
