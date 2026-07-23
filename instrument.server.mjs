import * as Sentry from "@sentry/react-router";

Sentry.init({
    dsn: "https://63aa0ebe05d648b2b237d4c3fa649df0@o4511705442484224.ingest.us.sentry.io/4511706755104768",
    dataCollection: {
        // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#dataCollection
        // userInfo: false,
        // httpBodies: [],
    },
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // We recommend adjusting this value in production
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#tracesSampleRate
    tracesSampleRate: 1.0,
});