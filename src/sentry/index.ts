import * as Sentry from "@sentry/electron";
import { isDevelopment } from "../utils/isDevelopment";

if (!isDevelopment()) {
  Sentry.init({
    dsn: "https://00ebb377920d4281b2098daace32d675@o447395.ingest.sentry.io/5821240",
  });
}
