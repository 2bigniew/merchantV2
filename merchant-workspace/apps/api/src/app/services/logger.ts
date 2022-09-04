import { createLogger } from "bunyan";

export const logger = createLogger({
  name: "Merchant",
  src: true
});
