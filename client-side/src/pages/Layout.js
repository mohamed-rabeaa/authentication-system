import React from 'react'
import { Outlet } from 'react-router-dom'
import Container from '../component/Container'


const Layout = () => {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout