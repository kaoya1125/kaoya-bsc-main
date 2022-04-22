import React from 'react'
import {
  HomeWrapper,
  InnerContainer
} from './styles'
import { HomeHero } from './components/HomeHero';
import { MasterChief } from './components/MasterChief';
import { RoadMap } from './components/RoadMap';

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <InnerContainer>
        <HomeHero />
        <MasterChief />
        <RoadMap />
      </InnerContainer>
    </HomeWrapper>
    // <Page>
    //   <PageHeader
    //     icon={<img src={chef} height={120} />}
    //     title="MasterChef is Ready"
    //     subtitle="Stake SASHIMI/Uniswap LP tokens to eat your yummy SASHIMI!"
    //   />
    //   <Balances />
    //   <Spacer size="lg" />
    //   <Center>
    //     <Button size="large" type="primary">
    //       <Link to="/farms">
    //         See the Menu
    //       </Link>
    //     </Button>
    //   </Center>
    // </Page>
  )
}


export default Home
