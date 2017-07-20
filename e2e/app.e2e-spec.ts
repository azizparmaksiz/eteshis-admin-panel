import { EteshisAdminPanelPage } from './app.po';

describe('eteshis-admin-panel App', () => {
  let page: EteshisAdminPanelPage;

  beforeEach(() => {
    page = new EteshisAdminPanelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
