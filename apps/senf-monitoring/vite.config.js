import reactJsx from "vite-react-jsx";
import tsconfigPaths from "vite-tsconfig-paths";

export default {
  plugins: [reactJsx(), tsconfigPaths()],
};
