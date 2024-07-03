import { Game } from "../game/game"
import { Layout } from 'antd';
import { dellBlue } from "../game/components/Cards/handlers/getRandomCards";
import styled from "@emotion/styled";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${dellBlue}
`;

const Title = styled.h1`
  color: white;
  font-weight: 500;
  font-size: 25px;
`;

export const LandingPage = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Title>CONNECTIONS GAME | BA PROGRAM</Title>
      </Header>
      <Game />
    </Layout>

  )
}