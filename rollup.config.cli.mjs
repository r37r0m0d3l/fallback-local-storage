import { default as config, OUTPUT_NAME } from "./rollup.config.mjs";

export default {
  ...config,
  output: [
    {
      file: `./dist/${OUTPUT_NAME}.cjs`,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: `./dist/${OUTPUT_NAME}.mjs`,
      format: "es",
      sourcemap: true,
    },
  ],
};
