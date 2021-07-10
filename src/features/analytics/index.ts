import { sendDataToAnalytics, initAnalyticsFx } from './analytics';

const analyticsService = {
  sendEvent: sendDataToAnalytics,
  initFx: initAnalyticsFx,
};

export { analyticsService };
