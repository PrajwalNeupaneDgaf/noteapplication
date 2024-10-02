import InputField from '@/Pages/Admin/Components/InputField'
import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'

function Contactus() {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "98675ae0-95b7-4e8b-992f-290f95bd08c9");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
        }
      };
    
      return (
          <form onSubmit={onSubmit}>
            <Box className='gap-3 flex flex-col'>
            <Input border={'1px gray solid'} type='text' name='Name' placeholder='Your Name..' required/>
            <Input border={'1px gray solid'} type='email' name='E-Mail' placeholder='Your Email..' required/>
            <Input border={'1px gray solid'} as={'textarea'} type='text' name='Message' placeholder='Your Message..' h={'7rem'} resize={'none'} required/>
            </Box>
            <Box className='flex justify-center align-middle mt-4'>
                <Button type='submit' colorScheme={'blue'}>
                    Send Message
                </Button>
            </Box>
          </form>
      );
}

export default Contactus