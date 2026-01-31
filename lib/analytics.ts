export const sendGAEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  } else {
    // Optional: Log to console in development to verify events are firing
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA Event]: ${eventName}`, params);
    }
  }
};
