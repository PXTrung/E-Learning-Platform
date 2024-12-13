import { ErrorBoundary } from "react-error-boundary";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ErrorPage from "./layouts/ErrorPage";
import Routers from "./routes/Routers";
import "@mantine/core/styles.css";
import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#ffe9e9",
  "#ffd1d1",
  "#fba0a1",
  "#f76d6d",
  "#f34141",
  "#f22625",
  "#f21616",
  "#d8070b",
  "#c10008",
  "#a90003",
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <MantineProvider theme={theme}>
        <Routers />
      </MantineProvider>
    </ErrorBoundary>
  );
};

export default App;
