import styled from "styled-components";
import { connect } from "react-redux";

import React from "react";

const LeftSide = (props) => {
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo>
              {props.user && <img src={props.user.photoURL} alt="" />}
            </Photo>
            <Link>
              Welcome, {props.user ? props.user.displayName : ""} there!
            </Link>
          </a>
          <a>
            <AddPhotoText>Add a photo</AddPhotoText>
          </a>
        </UserInfo>
        <Widget>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </Item>
      </ArtCard>
      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src="/images/plus-icon.svg" alt="" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
`;
const ArtCard = styled.div`
  text-align: center;
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 8px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.76);
`;
const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0 0 0 0.15px);
  padding: 12px 12px 12px;
`;
const CardBackground = styled.div`
  background: url("/images/Card-bg.svg");
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;
const Photo = styled.div`
  background: url("/images/photo.svg") no-repeat center center;
  background-size: 60%;
  width: 72px;
  height: 72px;
  object-fit: contain;
  margin: -38px auto;
  margin-bottom: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: #fff;
  img {
    width: 72px;
    height: 72px;
    object-fit: contain;
    margin: -4px auto;
    margin-bottom: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: #fff;
  }
`;
const Link = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
  line-height: 1.5;
  font-weight: 600;
`;
const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;
const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  a {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      cursor: pointer;
    }
    div {
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 14px;
        line-height: 1.33;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    svg {
      color: rgba(0, 0, 0, 1);
    }
  }
`;
const Item = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: block;
  padding: 12px;
  text-align: left;
  font-size: 14px;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.8);
    svg {
      color: rgba(0, 0, 0, 0.8);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;
const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 14px;

    &:hover {
      color: #0a66c2;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;

      border-top: 1px solid #d6cec2;
      padding: 14px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(LeftSide);
