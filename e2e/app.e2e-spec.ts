import { MyappPage } from './app.po';

describe('myapp App', () => {
  let page: MyappPage;

  beforeEach(() => {
    page = new MyappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
