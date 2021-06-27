import { isDevelopment } from "../../utils/isDevelopment";

const Paddle = window.Paddle;

Paddle.Setup({ vendor: process.env.PADDLE_VENDOR_ID, debug: isDevelopment() });

export { Paddle };
