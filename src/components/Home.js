import styled from "styled-components";
import React from "react";
import Header from "./Header";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Main from "./Main";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  console.log(props.loading);
  return (
    <div>
      <Container>
        {!props.user && <Redirect to="/" />}
        <Section>
          <h5>
            <a href="">Hiring in a hurry!</a>
          </h5>
          <p>
            Find talented pros in record time with Upwork and business movement!
          </p>
        </Section>
        <Layout>
          <LeftSide className="left">Left Side</LeftSide>
          <Main className="main">Main</Main>
          <RightSide className="right">Right</RightSide>
        </Layout>
      </Container>
    </div>
  );
};
const Container = styled.div`
  padding-top: 102px;
  width: 100%;
`;
const Section = styled.section`
  min-height: 20px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
    margin-bottom: 25px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin-top: -35px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  margin: 25px auto;
  column-gap: 25px;
  row-gap: 25px;
  margin: 20px;
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
  };
};

export default connect(mapStateToProps)(Home);
