import { createDomain, guard, sample } from 'effector';

import { AnalyticsEvent, initAnalytics, sendEvent } from './lib';

const analyticsDomain = createDomain();

const initAnalyticsFx = analyticsDomain.createEffect({
  handler: initAnalytics,
});

const sendEventFx = analyticsDomain.createEffect({ handler: sendEvent });
const sendManyEventsFx = analyticsDomain.createEffect({
  handler: (events: AnalyticsEvent[]) => Promise.all(events.map(sendEventFx)),
});

const sendDataToAnalytics = analyticsDomain.createEvent<AnalyticsEvent>();
const sendEventToQueue = analyticsDomain.createEvent<AnalyticsEvent>();
const delayedEventsSent = analyticsDomain.createEvent();

const $inited = analyticsDomain
  .createStore(false)
  .on(initAnalyticsFx.done, () => true);

const $notInited = $inited.map((inited) => !inited);

const $delayedEvents = analyticsDomain
  .createStore<AnalyticsEvent[]>([])
  .on(sendEventToQueue, (events, newEvent) => [...events, newEvent])
  .reset(delayedEventsSent);

// Inited case
guard({ source: sendDataToAnalytics, target: sendEventFx, filter: $inited });

// Not-inited case
guard({
  source: sendDataToAnalytics,
  target: sendEventToQueue,
  filter: $notInited,
});

sample({
  source: $delayedEvents,
  target: [sendManyEventsFx, delayedEventsSent],
  clock: initAnalyticsFx.done,
});

export { analyticsDomain, sendDataToAnalytics, initAnalyticsFx, sendEventFx };
