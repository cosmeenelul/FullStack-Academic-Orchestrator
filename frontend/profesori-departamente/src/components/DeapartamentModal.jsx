import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

const DepartamentModal = ({ isOpen, onClose }) => {
  // Dacă modalul nu este deschis, nu returnăm nimic (nu randăm nimic)
  if (!isOpen) return null;

  return (
    <>
      {/* --- CSS PENTRU ANIMAȚII --- */}
      {/* Le păstrăm aici ca să fie disponibile doar când modalul e activ */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; backdrop-filter: blur(0px); }
            to { opacity: 1; backdrop-filter: blur(5px); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      {/* --- OVERLAY (FUNDALUL NEGRU) --- */}
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
        animation="fadeIn 0.3s ease-out forwards"
        onClick={onClose}
      >
        {/* --- FEREASTRA MODALĂ --- */}
        <Box
          bg="#0f172a"
          w="500px"
          maxW="90%"
          borderRadius="2xl"
          border="1px solid"
          borderColor="blue.700"
          boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8)"
          p="6"
          position="relative"
          onClick={(e) => e.stopPropagation()} // Oprește click-ul să ajungă la fundal
          animation="slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        >
          {/* Header */}
          <Flex justify="space-between" align="center" mb="6">
            <Box>
              <Heading size="lg" color="white">
                Adaugă Departament
              </Heading>
              <Text fontSize="sm" color="gray.400">
                Completează detaliile noii structuri.
              </Text>
            </Box>
            <IconButton
              onClick={onClose}
              icon={<FiX />}
              bg="whiteAlpha.100"
              color="white"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "red.500", transform: "rotate(90deg)" }}
              transition="all 0.3s"
            >
              <FiX />
            </IconButton>
          </Flex>

          {/* Formular */}
          <Stack gap="5">
            <Box>
              <Text
                color="blue.200"
                mb="2"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="wide"
              >
                NUME DEPARTAMENT
              </Text>
              <Input
                placeholder="ex: Facultatea de Automatică"
                bg="whiteAlpha.50"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                  bg: "whiteAlpha.100",
                }}
                transition="all 0.2s"
              />
            </Box>

            <Box>
              <Text
                color="blue.200"
                mb="2"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="wide"
              >
                TELEFON
              </Text>
              <Input
                placeholder="ex: 021 402 ..."
                bg="whiteAlpha.50"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                _focus={{ borderColor: "blue.500", bg: "whiteAlpha.100" }}
                transition="all 0.2s"
              />
            </Box>

            <Box>
              <Text
                color="blue.200"
                mb="2"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="wide"
              >
                WEBSITE
              </Text>
              <Input
                placeholder="https://..."
                bg="whiteAlpha.50"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                _focus={{ borderColor: "blue.500", bg: "whiteAlpha.100" }}
                transition="all 0.2s"
              />
            </Box>
          </Stack>

          {/* Footer Butoane */}
          <Flex mt="8" justify="flex-end" gap="3">
            <Button
              onClick={onClose}
              variant="ghost"
              color="gray.400"
              _hover={{ color: "white", bg: "whiteAlpha.100" }}
            >
              Anulează
            </Button>
            <Button
              bgGradient="to-r"
              gradientFrom="blue.600"
              gradientTo="blue.400"
              color="white"
              px="8"
              _hover={{
                opacity: 0.9,
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(66, 153, 225, 0.6)",
              }}
              transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              boxShadow="lg"
            >
              Salvează
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default DepartamentModal;
