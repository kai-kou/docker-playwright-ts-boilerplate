import { container } from "./scripts/container.js";
import { example } from "./scripts/example.js";

await container(example);

// if you want to execute src/scripts/example2.ts, you can do this:
// import { example2 } from "./scripts/example2.js";
// await container(example2);
