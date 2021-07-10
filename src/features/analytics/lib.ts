let inited = false;

export async function initAnalytics() {
  await new Promise((res) => setTimeout(res, 3000));
  inited = true;
  console.log('INIT analytics');
}

export type AnalyticsEvent = {
  name: string;
  payload: Record<string, string | number>;
};

export function sendEvent({ name, payload }: AnalyticsEvent) {
  if (!inited) {
    throw new Error('Analytics not initialized!');
  }

  console.log(
    `Sending event: ${name} with payload "${JSON.stringify(payload)}"`,
  );
}
