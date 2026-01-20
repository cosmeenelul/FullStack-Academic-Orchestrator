import React from "react";
import { Box, VStack, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FiAlertCircle, FiRefreshCw, FiX } from "react-icons/fi";

const ErrorFeedback = ({
  title = "Eroare!",
  message = "A apărut o problemă la salvarea datelor.",
  onRetry,
  onClose,
}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="blackAlpha.900"
      backdropFilter="blur(10px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="10000"
      p={6}
    >
      <style>
        {`
          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
          @keyframes pulseRed {
            0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(229, 62, 62, 0); }
            100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
          }
        `}
      </style>

      <VStack spacing={6} textAlign="center" maxW="400px">
        <Box
          position="relative"
          w="100px"
          h="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(30, 13, 13, 0.6)"
          borderRadius="full"
          border="2px solid"
          borderColor="red.500"
          animation="pulseRed 2s infinite"
        >
          
          <Box
            position="absolute"
            inset="0"
            bg="red.500"
            filter="blur(25px)"
            opacity="0.3"
            borderRadius="full"
          />

          <Icon as={FiAlertCircle} boxSize="50px" color="red.400" zIndex="1" />
        </Box>

        <Box>
          <Heading size="lg" color="white" mb={2}>
            {title}
          </Heading>
          <Text color="red.200" fontSize="md">
            {message}
          </Text>
        </Box>

        <Box display="flex" gap="4">
          
          {onClose && (
            <Button
              onClick={onClose}
              variant="ghost"
              color="gray.400"
              _hover={{ bg: "whiteAlpha.100", color: "white" }}
            >
              Închide
            </Button>
          )}

          {onRetry && (
            <Button
              onClick={onRetry}
              size="lg"
              bgGradient="linear(to-r, red.600, red.400)"
              color="gray.800"
              _hover={{
                bgGradient: "linear(to-r, red.500, red.300)",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 20px -10px rgba(245, 101, 101, 0.5)",
              }}
              transition="all 0.2s"
              leftIcon={<Icon as={FiRefreshCw} />}
              borderRadius="full"
              px={8}
            >
              Încearcă din nou
            </Button>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ErrorFeedback;
