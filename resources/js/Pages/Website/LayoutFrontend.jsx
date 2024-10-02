import React from 'react'
import Header from './Partials/Header'
import Footer from './Partials/Footer'
import { Box } from '@chakra-ui/react'
import { ContextFrontend } from './ContextFrontend'
  function LayoutFrontend({children,faculties}) {
    return (
    <>
        <Header faculties={faculties}/>
        <Box>
            <ContextFrontend.Provider value={{}}>
                {children}
            </ContextFrontend.Provider>
        </Box>
        <Footer/>
    </>
  )
}

export default LayoutFrontend