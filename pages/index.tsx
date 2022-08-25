import type { NextPage } from "next";
import { RecoilRoot } from "recoil";
import App from "./app";

const Home: NextPage = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

export default Home;
