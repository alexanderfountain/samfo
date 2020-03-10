import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"

const FooterStyle = styled.footer`
  padding: 40px 0px;
`

export const Footer = () => {
  return (
    <FooterStyle>
      <Container className="footer-container">
        &copy; {new Date().getFullYear()} Prescriptive
      </Container>
    </FooterStyle>
  )
}

export default Footer
