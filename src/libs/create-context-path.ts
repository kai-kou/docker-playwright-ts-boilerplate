/**
 * format like to `eee/index` from `./src/eee/index.ts`
 *
 * `app dir` is root directory in Docker container
 */
export const createContextPath = (filename: string) =>
  filename.slice("/app/src/scripts/".length).slice(0, -".ts".length);
