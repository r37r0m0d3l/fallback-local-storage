import { default as config, OUTPUT_NAME } from "./rollup.config.mjs";

const UMD_NAME = "FallbackLocalStorage";

export default {
  ...config,
  output: [
    {
      file: `./dist/${OUTPUT_NAME}.js`,
      format: "umd",
      globals: {},
      name: UMD_NAME,
      sourcemap: true,
    },
  ],
};
