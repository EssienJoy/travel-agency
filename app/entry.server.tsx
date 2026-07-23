import { PassThrough } from "node:stream";
import * as Sentry from "@sentry/react-router";

import type { AppLoadContext, EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";

export const streamTimeout = 5_000;

const handleRequest = Sentry.createSentryHandleRequest({
	ServerRouter,
	renderToPipeableStream,
	createReadableStreamFromReadable,
});
export default handleRequest;
export const handleError = Sentry.createSentryHandleError({
	logErrors: false,
});
// Automatically instruments all server loaders, actions, middleware,
// and request handlers. Requires React Router 7.15+.
export const instrumentations = [Sentry.createSentryServerInstrumentation()];
// ... rest of your server entry
