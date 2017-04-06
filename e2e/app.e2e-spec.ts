import { MyjsPage } from './app.po';

describe('myjs App', () => {
  let page: MyjsPage;

  beforeEach(() => {
    page = new MyjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
