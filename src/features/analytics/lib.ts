let inited = false;

export async function iniAnalytics() {
  await new Promise((res) => setTimeout(res, 3000));
  inited = true;
}

export function sendEvent({
  name,
  payload,
}: {
  name: string;
  payload: Record<string, string | number>;
}) {
  if (!inited) {
    throw new Error('Analytics not initialized!');
  }

  console.log(
    `Sending event: ${name} with payload "${JSON.stringify(payload)}"`,
  );
}
