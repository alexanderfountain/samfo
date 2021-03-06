import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import { Link, RichText, Date } from "prismic-reactjs"
import YouTube from "react-youtube"
import ResponsiveEmbed from "react-responsive-embed"

const BasicStyle = styled.div`
  .video-container-outer {
    .video-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      min-height: 500px;

      video {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .video-content {
        position: relative;
        z-index: 1;
        h2 {
          color: white;
          text-align: center;
        }
      }
    }
  }
  .youtube-video-container {
    position: relative;
    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: rgba(0, 0, 0, 0.75);
    }
  }
`

export const BasicSectionSlice = ({ slice }) => {
  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
    },
  }
  var font_color = null
  var fluid = null
  var bg_color = null
  var h1_title = false
  var bg_video = null
  var video_id = null
  var bg_video_image = false
  if (slice.primary.background_image != null) {
    fluid = slice.primary.background_image.fluid
  }
  if (slice.primary.background_video != null) {
    bg_video = slice.primary.background_video.url
  }
  if (slice.primary.youtube_background.embed_url != null) {
    var video_id = slice.primary.youtube_background.embed_url.split("v=")[1]
    var ampersandPosition = video_id.indexOf("&")
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition)
    }
  }
  if (
    slice.primary.background_video == null &&
    slice.primary.background_image == null &&
    slice.primary.youtube_background == null
  ) {
    bg_video_image = true
  }
  if (slice.primary.background_color != null) {
    bg_color = slice.primary.background_color
  }
  if (slice.primary.font_color != null) {
    font_color = slice.primary.font_color
  }
  if (slice.primary.h1_title != null) {
    h1_title = slice.primary.h1_title
  }
  // const content = slice.primary.content.raw.map(function(slice, index) {
  //   if (slice.type === "heading1") {
  //     console.log(slice)
  //     return <h1>{RichText.render(slice)}</h1>
  //   }
  // })
  return (
    <BasicStyle>
      {fluid && (
        <BackgroundImage
          Tag="section"
          fluid={fluid}
          style={{ backgroundColor: bg_color }}
        >
          <Container style={{ color: font_color }}>
            {slice.primary.section_title.text && h1_title && (
              <h1>{slice.primary.section_title.text}</h1>
            )}
            {slice.primary.section_title.text && !h1_title && (
              <h2>{slice.primary.section_title.text}</h2>
            )}
            <div
              className="section-content"
              dangerouslySetInnerHTML={{ __html: slice.primary.content.html }}
            />
          </Container>
        </BackgroundImage>
      )}
      {bg_video && (
        <div class="video-container-outer">
          <div class="video-container">
            <video
              autoplay="autoplay"
              loop="true"
              muted="true"
              playsinline="true"
              preload="auto"
              src={bg_video}
              type="video/mp4"
            ></video>
            <Container>
              <section>
                <div class="video-content">
                  <h2>Video Tag Example.</h2>
                </div>
              </section>
            </Container>
          </div>
        </div>
      )}
      {video_id && (
        <div class="youtube-video-container">
          <ResponsiveEmbed
            src={
              "https://www.youtube.com/embed/" +
              video_id +
              "?loop=1&autoplay=1&mute=1&showinfo=0&controls=0&rel=0&iv_load_policy=3&modestbranding=1&autohide=1&playlist=" +
              video_id
            }
          />
        </div>
      )}
      {bg_video_image && (
        <div style={{ backgroundColor: bg_color }}>
          <Container>
            <section>
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: slice.primary.content.html }}
              />
            </section>
          </Container>
        </div>
      )}
    </BasicStyle>
  )
}

export default BasicSectionSlice
