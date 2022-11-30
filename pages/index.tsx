import type { NextPage } from "next";

import Page from "../containers/Page";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <Page pageRoute="Home">
      <Hero />
    </Page>
  );
};

export default Home;
