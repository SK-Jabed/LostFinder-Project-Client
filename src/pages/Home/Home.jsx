import React from 'react';
import LatestItems from './LatestItems';
import Carousel from '../../components/Carousel';
import CallToAction from './CallToAction';
import SuccessStories from './SuccessStories';
import HowItWorks from './HowItWorks';
import TestimonialsSection from './TestimonialsSection';
import FeaturesSection from './FeaturesSection';
import CommunitySection from './CommunitySection';
import { Helmet } from "react-helmet-async";


const Home = () => {
    return (
      <div>
        <Helmet>
          <title>Home | LostFinder</title>
        </Helmet>
        <Carousel></Carousel>

        <HowItWorks></HowItWorks>

        <LatestItems></LatestItems>

        <FeaturesSection></FeaturesSection>

        <CommunitySection></CommunitySection>
      </div>
    );
};

export default Home;