import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import rollupPluginTerser from "rollup-plugin-terser";

const INPUT_NAME = "index.mjs";
const OUTPUT_NAME = "fallback-local-storage";

export default {
  input: `./src/${INPUT_NAME}`,
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
  plugins: [
    babel({ babelrc: true }),
    resolve(),
    commonjs(),
    rollupPluginTerser.terser({
      output: {
        comments: false,
      },
      sourcemap: true,
      warnings: true,
      keep_classnames: true,
      keep_fnames: true,
    }),
  ],
};
