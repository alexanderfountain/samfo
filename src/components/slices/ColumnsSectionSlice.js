import styled from "styled-components"
import React from "react"
import BackgroundImage from "gatsby-background-image"
import Container from "../container"
import HtmlRender from "../../utils/htmlSerializer"
import linkResolver from "../../utils/linkResolver"
import { RichText } from "prismic-reactjs"
const PrismicDOM = require("prismic-dom")
const ColumnStyle = styled.section`
  .column {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .column-count-2 {
    .column-item {
      width: calc(100% / 2 - 10px);
    }
  }
  .column-count-3 {
    .column-item {
      width: calc(100% / 3 - 10px);
    }
  }
  .column-count-4 {
    .column-item {
      width: calc(100% / 4 - 10px);
    }
  }
  .column-count-5 {
    .column-item {
      width: calc(100% / 5 - 10px);
    }
  }
  .column-count-6 {
    .column-item {
      width: calc(100% / 6 - 10px);
    }
  }
`

function ColumnsSectionSlice({ slice }) {
  var fluid = null
  var bgColor = null
  var columnCount = null
  var items = null
  if (slice.primary.background_image != null) {
    fluid = slice.primary.background_image.localFile.childImageSharp.fluid
  }
  if (slice.primary.background_color != null) {
    bgColor = slice.primary.background_color
  }
  if (slice.primary.column_count != null) {
    columnCount = slice.primary.column_count
  }
  if (slice.items != null) {
    items = slice.items
  }
  const spans = []
  // items = slice.items
  return (
    <div>
      {fluid && (
        <BackgroundImage Tag="section" fluid={fluid}>
          <ColumnStyle>
            <Container className={"column column-count-" + columnCount}>
              {slice.items &&
                slice.items.map((item, index) => (
                  <div
                    key={index}
                    className="column-item"
                    dangerouslySetInnerHTML={{ __html: item.content.html }}
                  />
                ))}
            </Container>
          </ColumnStyle>
        </BackgroundImage>
      )}
      {!fluid && (
        <ColumnStyle
          style={{ backgroundColor: slice.primary.background_color }}
        >
          <Container className={"column column-count-" + columnCount}>
            {slice.items &&
              slice.items.map((item, index) => (
                <div
                  key={index}
                  className="column-item"
                  dangerouslySetInnerHTML={{ __html: item.content.html }}
                />
              ))}
          </Container>
        </ColumnStyle>
      )}
    </div>
  )
}

export default ColumnsSectionSlice
