import styled from "styled-components";
import PostModal from "./PostModal";
import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticlesAPI } from "../action";
import ReactPlayer from "react-player";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import CreateIcon from "@material-ui/icons/Create";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticles();
  }, []);
  console.log(props.articles);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open": {
        setShowModal("close");
        break;
      }
      case "close": {
        setShowModal("open");
        break;
      }
      default: {
        setShowModal("close");
        break;
      }
    }
  };
  return (
    <>
      {props.articles.length == 0 ? (
        <p>There are no articles to show</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button onClick={handleClick}>Start a Post</button>
            </div>
            <div>
              <button>
                <PhotoIcon />
                <span>Photo</span>
              </button>
              <button>
                <VideoCallIcon />
                <span>Video</span>
              </button>
              <button>
                <EventAvailableIcon />
                <span>Event</span>
              </button>
              <button>
                <CreateIcon />
                <span>Write Article</span>
              </button>
            </div>
          </ShareBox>
          <div>
            {props.articles.map((article) => (
              <Article key={article.id}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="user avatar" />
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src="" alt="" />
                    button
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImage>
                  {article.sharedImg && (
                    <a>
                      <img src={article.sharedImg} alt="" />
                    </a>
                  )}
                  {article.video && (
                    <ReactPlayer width="100%" url={article.video} />
                  )}
                </SharedImage>
                <SocialCounts>
                  <li>
                    <button>
                      <ThumbUpIcon />
                      <FavoriteIcon />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>
                      <span>{article.comments}</span>
                      <p>comments</p>
                    </a>
                  </li>
                </SocialCounts>
              </Article>
            ))}
          </div>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const ShareBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: #fff;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.76);
  div {
    button {
      outline: none;
      color: rgba(0, 0, 00.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      ${CreateIcon} {
        color: rgba(0, 0, 0, 0.5);
      }
      span {
        margin-left: 4px;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #fff;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled.div`
  padding: 0;
  margin: 0;
  overflow: visible;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.76);
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: no-wrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    width: 100%;
    height: 80%;
    object-fit: contain;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    button {
      display: flex;
      align-items: center;
      color: #0a66c2;
      border: 1px solid #0a66c2;
      padding: 4px 8px;
      border-radius: 20px;
      span {
        color: #0a66c2;
      }
    }
    a {
      display: flex;
      align-items: center;
      color: #0a66c2;
      p {
        color: rgba(0, 0, 0, 0.6);
        margin-left: 4px;
      }
      span {
        color: #70b5f9;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
