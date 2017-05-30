import { AlbumsPage } from './app.po';

describe('albums App', () => {
  let page: AlbumsPage;

  beforeEach(() => {
    page = new AlbumsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
