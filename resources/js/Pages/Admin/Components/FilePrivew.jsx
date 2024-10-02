import React, { useEffect } from 'react';
import { Box, Text, Center } from '@chakra-ui/react';
import { Inertia } from '@inertiajs/inertia';

function FilePreview({ filePath, name }) {
  console.log(filePath);

  // Check if the file path is provided
  if (!filePath) {
    return (
      <Center>
        <Text>No file to preview</Text>
      </Center>
    );
  }

  const fileExtension = filePath.split('.').pop().toLowerCase();

  useEffect(() => {
    // Check if the file is a DOCX
    if (fileExtension === 'docx') {
      // Automatically initiate the download
      window.location.href = `http://localhost:8000/${filePath}`;

      // Redirect back to the previous page after a brief delay
      const timer = setTimeout(() => {
        window.history.back();// Go back to the previous page
      }, 500); // Delay can be adjusted

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [fileExtension, filePath]);

  return (
    <Box 
      height={'900px'}
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={5} 
      boxShadow="lg"
      mx="auto"  
      my={8}     
      bg="gray.50"
    >
      <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
        {name || 'File Preview'}
      </Text>

      {/* PDF Preview */}
      {fileExtension === 'pdf' && (
        <Box 
          height="700px" 
          overflow="auto" 
          border="1px" 
          borderColor="gray.200"
          borderRadius="md" 
          p={4} 
          bg="white"
          boxShadow="inner"
        >
          <embed
            src={`http://localhost:8000/${filePath}`}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </Box>
      )}

      {/* Unsupported file message */}
      {!['pdf', 'docx'].includes(fileExtension) && (
        <Center>
          <Text color="red.500">File type not supported for preview.</Text>
        </Center>
      )}
    </Box>
  );
}

export default FilePreview;
