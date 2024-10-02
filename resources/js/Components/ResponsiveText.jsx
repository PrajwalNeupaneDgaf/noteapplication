import { Text } from '@chakra-ui/react'
import React from 'react'

function ResponsiveText({children , textAlign ,className},...props) {
  return (
    <Text {...props} className={"font-thin my-auto "+className} textAlign={textAlign} fontFamily={'sans-serif'}  fontSize={['.5rem', '.5rem', '.7rem', '.9rem']}>
        {children}
    </Text>
  )
}
  
export default ResponsiveText