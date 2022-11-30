import type { NextPage } from "next";

import Page from "../containers/Page";
import TeamSection from "../components/mintpage/TeamSection";
import ChapterSection from "../components/mintpage/ChapterSection";
import AboutGonnaSection from "../components/mintpage/AboutGonnaSection";
import GonnaDividerSection from "../components/mintpage/GonnaDividerSection";
import MintSection from "../components/mintpage/MintSection";
import LandingHeroSection from "../components/mintpage/LandingHeroSection";

const NewHome: NextPage = () => {
  return (
    <Page pageRoute="NewHome">
      <LandingHeroSection />
      <ChapterSection />
      <MintSection />
      <GonnaDividerSection />
      <AboutGonnaSection />
      <TeamSection />
    </Page>
  );
};

export default NewHome;
