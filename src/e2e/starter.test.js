import { element } from 'detox';

describe('Some test', () => {
  beforeAll(async () => {
    await device.launchApp();
    debugger;
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have header visible on screen', async () => {
    const a = element(by.id('header'));
    console.log(a);
    await expect(element(by.id('header'))).toBeVisible();
  });
});
