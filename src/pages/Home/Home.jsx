import React from 'react';
import LatestItems from './LatestItems';
import Carousel from '../../components/Carousel';
import CallToAction from './CallToAction';
import SuccessStories from './SuccessStories';
import HowItWorks from './HowItWorks';
import TestimonialsSection from './TestimonialsSection';
import FeaturesSection from './FeaturesSection';
import CommunitySection from './CommunitySection';


const Home = () => {
    return (
      <div>
        <Carousel></Carousel>

        <LatestItems></LatestItems>

        <HowItWorks></HowItWorks>

        <FeaturesSection></FeaturesSection>
        
        <CommunitySection></CommunitySection>

      </div>
    );
};

export default Home;