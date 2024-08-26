import React from 'react'
import Background from "../assets/login.jpg"
import styled from 'styled-components'

export default function BackgroundImg() {
  return (
    <Container>
          <img src={Background} alt='background' />
    </Container>
  )
};

const Container = styled.div`
height:100vh;
width:100vw;
img {
height:100vh;
width:100vw;}`;
