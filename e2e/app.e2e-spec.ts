import { EteshisFrontendPage } from './app.po';

describe('eteshis-frontend App', () => {
  let page: EteshisFrontendPage;

  beforeEach(() => {
    page = new EteshisFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
