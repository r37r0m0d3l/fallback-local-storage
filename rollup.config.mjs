import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import rollupPluginTerser from "rollup-plugin-terser";

const INPUT_NAME = "index.mjs";

export const OUTPUT_NAME = "fallback-local-storage";

export default {
  input: `./src/${INPUT_NAME}`,
  output: [],
  plugins: [
    babel({ babelrc: true }),
    resolve(),
    commonjs(),
    rollupPluginTerser.terser({
      keep_classnames: true,
      keep_fnames: true,
      output: {
        comments: false,
      },
      sourcemap: true,
      warnings: true,
    }),
  ],
};
