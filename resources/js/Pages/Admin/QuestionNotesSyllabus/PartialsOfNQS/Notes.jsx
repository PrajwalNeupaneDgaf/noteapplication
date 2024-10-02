import { Box, Input, Text, Grid, Button, Tooltip, IconButton, useToast } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import React, { useContext } from 'react';
import NQSContextCreate from '../NQSContextCreate';

function EnterNote() {
  const { noteData, setNoteData } = useContext(NQSContextCreate);
  const toast = useToast();

  // Handle input changes for title and file fields at a specific index
  const handleInputChange = (field, value, index) => {
    const updatedNoteData = noteData.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setNoteData(updatedNoteData);
  };

  // Add a new note form
  const addNoteForm = () => {
    // Check if the current note has both a title and a file before adding a new one
    if (noteData[noteData.length - 1].title !== '' && noteData[noteData.length - 1].file != null) {
      setNoteData([...noteData, { title: '', file: null }]);
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in the title and upload a file before adding a new note',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // Remove a note form
  const removeNoteForm = (index) => {
    if (noteData.length > 1) {
      const updatedNoteData = noteData.filter((_, idx) => idx !== index);
      setNoteData(updatedNoteData);
    }
    else{
      setNoteData([{title:'',file:null}])
    }
  };

  return (
    <Box className='rounded-md m-2' p={4}>
      <Box className='flex flex-row justify-between'>
        <Text className='my-auto' fontSize='lg' fontWeight='bold'>
          Enter Note Details:
        </Text>
        <Button fontSize={'x-large'} onClick={addNoteForm}>
         +
        </Button>
      </Box>

      {/* Display each note form */}
      {noteData.map((item, index) => (
        <Box position="relative" key={index}>
          <Grid
            className='bg-white rounded-md my-2'
            templateColumns={['1fr', '1fr 1fr']}
            gap={6}
            p={3}
            position="relative"
          >
            {/* Note Title Input */}
            <Box className="grid" gridTemplateColumns={'1fr 3fr'}>
              <Text mr={4} className='my-auto'>
                Note Title {index + 1}:
              </Text>
              <Input
                type="text"
                value={item.title || ''}
                placeholder='Enter Note Title'
                onChange={(e) => handleInputChange('title', e.target.value, index)}
              />
            </Box>

            {/* Note File Input */}
            <Box className="grid" gridTemplateColumns={'1fr 3fr .1fr'}>
              <Text mr={4} className='my-auto'>
                Note File {index + 1}:
              </Text>
              <Input
                type="file"
                onChange={(e) => handleInputChange('file', e.target.files[0], index)}
                accept='.pdf,.docx'
              />
              
              {/* Remove Note Button */}
              <Tooltip label={noteData.length==1?'Clear all':"Remove Note"} aria-label="Remove Note Tooltip">
                <IconButton
                  icon={<CloseIcon />}
                  className='my-auto ml-2'
                  onClick={() => removeNoteForm(index)}
                  size="sm"
                  aria-label={`Remove Note ${index + 1}`}
                />
              </Tooltip>
            </Box>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default EnterNote;
