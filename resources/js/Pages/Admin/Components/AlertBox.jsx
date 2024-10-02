import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

function AlertBox({isOpen,header,body,setIsOpen,setDelete}) {
  return (
    <AlertDialog
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {header}
        </AlertDialogHeader>

        <AlertDialogBody>
          {body}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button onClick={()=>{
            setIsOpen(false)
          }} >
            Cancel
          </Button>
          <Button colorScheme='green' onClick={()=>{
            setDelete(true)
            }} ml={3}>
           Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
  )
}

export default AlertBox