import "@code-hike/mdx/styles";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/main.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
