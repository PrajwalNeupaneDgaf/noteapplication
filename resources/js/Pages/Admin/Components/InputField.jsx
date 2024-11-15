import ResponsiveText from '@/Components/ResponsiveText'
import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'

function InputField({Name ,Type,Value,setValue,...props}) {
  return (
    <Box className='grid grid-cols-2 ' fontSize={['.7rem','.9rem','1.1rem','1.2rem']}>
        <ResponsiveText className='text-center my-auto'>{Name}</ResponsiveText>
        <Input {...props} type={Type || 'text'} placeholder={`${Name}...`} value={Value} onChange={setValue} required/>
    </Box>
  )
}

export default InputField