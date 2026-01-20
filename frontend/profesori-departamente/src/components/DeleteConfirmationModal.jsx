import React from "react";
import { Box, Flex, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  departmentName,
  titlu,
  descriere,
  atentie,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; backdrop-filter: blur(0px); }
            to { opacity: 1; backdrop-filter: blur(5px); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
          @keyframes popIn {
             from { opacity: 0; transform: scale(0.9); }
             to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        bg="blackAlpha.800"
        zIndex="9999"
        display="flex"
        alignItems="center"
        justifyContent="center"
        animation="fadeIn 0.2s ease-out forwards"
        onClick={onClose}
      >
        <Box
          bg="#1a202c"
          w="450px"
          maxW="90%"
          borderRadius="xl"
          border="1px solid"
          borderColor="red.900"
          boxShadow="0 0 40px rgba(229, 62, 62, 0.2)"
          p="8"
          textAlign="center"
          position="relative"
          onClick={(e) => e.stopPropagation()}
          animation="popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
        >
          <Flex justify="center" align="center" mb="6">
            <Box
              p="4"
              borderRadius="full"
              bg="red.900"
              color="red.200"
              animation="shake 0.5s ease-in-out 0.3s"
            >
              <Icon as={FiAlertTriangle} boxSize="8" />
            </Box>
          </Flex>

          <Heading size="lg" color="white" mb="4">
            {titlu}
          </Heading>

          <Text color="gray.300" fontSize="md" mb="2">
            {descriere}
            <Text as="span" color="red.300" fontWeight="bold">
              {departmentName}
            </Text>
            .
          </Text>

          <Box
            bg="red.900"
            p="3"
            borderRadius="md"
            mb="8"
            borderLeft="4px solid"
            borderColor="red.500"
          >
            <Text
              color="red.100"
              fontSize="sm"
              fontWeight="bold"
              textAlign="left"
            >
              ⚠ ATENȚIE:
            </Text>
            <Text color="red.100" fontSize="sm" textAlign="left">
              {atentie}
            </Text>
          </Box>

          <Flex justify="center" gap="4">
            <Button
              onClick={onClose}
              variant="ghost"
              color="gray.400"
              _hover={{ bg: "whiteAlpha.100", color: "white" }}
              px="6"
            >
              Anulează
            </Button>

            <Button
              onClick={onConfirm}
              bg="red.600"
              color="white"
              px="6"
              _hover={{
                bg: "red.500",
                boxShadow: "0 0 15px rgba(245, 101, 101, 0.6)",
              }}
              fontWeight="bold"
            >
              Da, Șterge Tot
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default DeleteConfirmationModal;
