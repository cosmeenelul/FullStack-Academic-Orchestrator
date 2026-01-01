import React from "react";
import { Box, VStack, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const SuccessFeedback = ({
  title = "Operație Reușită!",
  message = "Datele au fost salvate cu succes în sistem.",
  onClose,
  actionLabel = "Continuă",
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
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes pulseGreen {
            0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(72, 187, 120, 0); }
            100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
          }
        `}
      </style>

      <VStack spacing={6} textAlign="center" maxW="400px">
        {/* Icon Container cu efect de Glow și Pulse */}
        <Box
          position="relative"
          w="100px"
          h="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(13, 16, 30, 0.6)"
          borderRadius="full"
          border="2px solid"
          borderColor="green.500"
          animation="pulseGreen 2s infinite"
        >
          {/* Background Glow */}
          <Box
            position="absolute"
            inset="0"
            bg="green.500"
            filter="blur(25px)"
            opacity="0.3"
            borderRadius="full"
          />

          <Icon
            as={FiCheckCircle}
            boxSize="50px"
            color="green.400"
            zIndex="1"
          />
        </Box>

        <Box>
          <Heading size="lg" color="white" mb={2}>
            {title}
          </Heading>
          <Text color="gray.300" fontSize="md">
            {message}
          </Text>
        </Box>

        <Button
          onClick={onClose}
          size="lg"
          bgGradient="linear(to-r, green.600, green.400)"
          color="gray.800"
          _hover={{
            bgGradient: "linear(to-r, green.500, green.300)",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px -10px rgba(72, 187, 120, 0.5)",
          }}
          transition="all 0.2s"
          rightIcon={<Icon as={FiArrowRight} />}
          borderRadius="full"
          px={8}
        >
          {actionLabel}
        </Button>
      </VStack>
    </Box>
  );
};

export default SuccessFeedback;
