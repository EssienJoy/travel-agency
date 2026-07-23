import { reactRouter } from "@react-router/dev/vite";
import {
	sentryReactRouter,
	type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const sentryConfig: SentryReactRouterBuildOptions = {
	org: "js-mastery-j07",
	project: "javascript-react",
	// An auth token is required for uploading source maps;
	// store it in an environment variable to keep it secure.
	authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
	// ...
};

// export default defineConfig({
// 	plugins: [, reactRouter()],
//

// });

export default defineConfig((config) => {
	return {
		plugins: [
			tailwindcss(),
			// tsConfigPaths(),
			reactRouter(),
			sentryReactRouter(sentryConfig, config),
		],
		resolve: {
			tsconfigPaths: true,
		},
		ssr: {
			noExternal: [/@syncfusion/],
		},
	};
});
