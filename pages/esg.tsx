import type { NextPage } from "next";

import ESGPage from "../containers/ESGPage";
import Hero from "../components/esg/Hero";
import How2 from "../components/esg/How2";
import Spacer from "../components/esg/Spacer";
import NFT from "../components/esg/NFT";

const ESGHome: NextPage = () => {
  return (
    <ESGPage>
      <>
        <Hero />
        <Spacer />
        <NFT />
        <How2 />
      </>
    </ESGPage>
  );
};

export default ESGHome;
