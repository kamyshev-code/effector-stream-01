import 'regenerator-runtime/runtime';

import { fork, allSettled } from 'effector';

import {
  analyticsDomain,
  sendDataToAnalytics,
  initAnalyticsFx,
  sendEventFx,
} from './analytics';

describe('analytics', () => {
  test('should send events instantly if analytics already inited', async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: 'test_event_1', payload: {} };

    const scope = fork(analyticsDomain, {
      handlers: new Map<any, any>([
        [initAnalyticsFx, jest.fn()],
        [sendEventFx, sendEventMock],
      ]),
    });

    await allSettled(initAnalyticsFx, { scope });

    await allSettled(sendDataToAnalytics, {
      scope,
      params: TEST_EVENT,
    });

    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });

  test('should send events only after intiailization', async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: 'test_event_1', payload: {} };

    const scope = fork(analyticsDomain, {
      handlers: new Map<any, any>([
        [initAnalyticsFx, jest.fn()],
        [sendEventFx, sendEventMock],
      ]),
    });

    await allSettled(sendDataToAnalytics, {
      scope,
      params: TEST_EVENT,
    });

    expect(sendEventMock).not.toHaveBeenCalled();

    await allSettled(initAnalyticsFx, { scope });

    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);

    await allSettled(initAnalyticsFx, { scope });

    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });
});
