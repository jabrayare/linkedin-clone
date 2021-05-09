import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../action";

function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setSharedImage(image);
  };
  const switchAssetArea = (area) => {
    setSharedImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    e.preventDefault();
    if (e.target != e.currentTarget) {
      return;
    }
    const payload = {
      image: sharedImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };
    props.postArticle(payload);
    reset(e);
  };
  const reset = (e) => {
    setEditorText("");
    setSharedImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>X</button>
            </Header>
            <ShareContent>
              <UserInfo>
                {props.user ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                    </p>
                    {sharedImage && (
                      <img src={URL.createObjectURL(sharedImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <SharedCreation>
              <div>
                <AssetButton onClick={() => setAssetArea("media")}>
                  Video
                </AssetButton>
                <AssetButton onClick={() => setAssetArea("image")}>
                  Image
                </AssetButton>
              </div>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
  transition: 0.3s ease-in;
`;
const Content = styled.div`
  width: 100%;
  max-width: 564px;
  background-color: #fff;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 75px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background-color: rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      cursor: pointer;
    }
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-size: 16px;
    font-weight: 600;
    margin-left: 4px;
    line-height: 1.5;
  }
`;
const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const PostButton = styled.button`
  padding: 4px 10px;
  border-radius: 20px;
  border: none;
  min-width: 60px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: #fff;
  &:hover {
    ${(props) => (props.disabled ? "cursor:not-allowed" : "cursor:pointer")}
  }
`;
const AssetButton = styled.button`
  padding: 8px 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin: 5px;
  border-radius: 20px;
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea,
  input {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 14px;
    padding: 4px;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
  input {
    min-height: 35px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
