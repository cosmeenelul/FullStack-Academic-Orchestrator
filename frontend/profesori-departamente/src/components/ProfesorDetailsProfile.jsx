import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Grid,
  Badge,
  IconButton,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FiX, FiMail, FiPhone, FiBriefcase, FiAward } from "react-icons/fi";

const ProfesorDetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const mockProfesor = {
    id: 99,
    nume: "Popescu",
    prenume: "Alexandru",
    email: "alexandru.popescu@upb.ro",
    telefon: "0722 999 888",
    departamente: [
      {
        departament: { nume: "Inteligență Artificială" },
        rolDepartament: "DIRECTOR",
      },
      {
        departament: { nume: "Inginerie Software" },
        rolDepartament: "MEMBRU_CONSILIU",
      },
      {
        departament: { nume: "Automatică și Calculatoare" },
        rolDepartament: "MEMBRU",
      },
      {
        departament: { nume: "Electronică Aplicată" },
        rolDepartament: "MEMBRU",
      },
      { departament: { nume: "Robotică" }, rolDepartament: "MEMBRU" },
    ],
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; backdrop-filter: blur(0px); }
            to { opacity: 1; backdrop-filter: blur(5px); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
          }
        `}
      </style>

      {/* --- OVERLAY --- */}
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
        p="4"
      >
        {/* --- CARDUL MODAL --- */}
        <Box
          bg="#0f172a"
          w="600px"
          maxW="100%"
          maxH="90vh"
          display="flex"
          flexDirection="column"
          borderRadius="2xl"
          border="1px solid"
          borderColor="blue.800"
          boxShadow="0 0 50px rgba(0,0,0,0.8)"
          position="relative"
          onClick={(e) => e.stopPropagation()}
          animation="slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          overflow="hidden"
        >
          {/* --- BUTONUL X (CORECAT PENTRU CONTRAST) --- */}
          <IconButton
            onClick={onClose}
            aria-label="Close modal"
            position="absolute"
            top="4"
            right="4"
            // AICI AM SCHIMBAT: Folosim whiteAlpha ca să fie deschis la culoare
            bg="whiteAlpha.200"
            backdropFilter="blur(4px)"
            border="1px solid"
            borderColor="whiteAlpha.300"
            color="white"
            size="sm"
            borderRadius="full"
            zIndex="20"
            _hover={{
              bg: "red.500",
              borderColor: "red.500",
              transform: "rotate(90deg)",
            }}
            transition="all 0.3s"
          >
            {/* Iconița explicită */}
            <FiX size={18} />
          </IconButton>

          {/* --- ZONA STATICĂ (Header + Avatar) --- */}
          <Box flexShrink={0}>
            {/* Header Gradient */}
            <Box
              h="120px"
              bgGradient="to-r"
              gradientFrom="blue.900"
              gradientTo="purple.900"
            />

            {/* Avatar și Nume */}
            <Flex direction="column" align="center" mt="-60px" px="6" pb="2">
              <Box p="1.5" bg="#0f172a" borderRadius="full">
                <Avatar.Root
                  size="2xl"
                  w="120px"
                  h="120px"
                  border="4px solid #3182ce"
                >
                  <Avatar.Fallback
                    bg="gray.700"
                    color="white"
                    fontSize="3xl"
                    fontWeight="bold"
                  >
                    {mockProfesor.prenume[0]}
                    {mockProfesor.nume[0]}
                  </Avatar.Fallback>
                </Avatar.Root>
              </Box>

              <Heading size="xl" color="white" mt="4" textAlign="center">
                {mockProfesor.prenume} {mockProfesor.nume}
              </Heading>
              <Badge
                mt="2"
                colorPalette="blue"
                variant="solid"
                px="3"
                py="1"
                borderRadius="full"
              >
                ID Profesor: #{mockProfesor.id}
              </Badge>
            </Flex>
          </Box>

          {/* --- ZONA SCROLLABILĂ (Content) --- */}
          <Box p="8" overflowY="auto" className="custom-scrollbar" flex="1">
            {/* Grid Contact Info */}
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap="4"
              mb="8"
            >
              <Flex
                bg="whiteAlpha.50"
                p="4"
                borderRadius="xl"
                align="center"
                gap="3"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="0.2s"
                _hover={{ borderColor: "blue.500", bg: "whiteAlpha.100" }}
              >
                <Box p="2" bg="blue.900" color="blue.200" borderRadius="lg">
                  <FiMail size="20" />
                </Box>
                <Box overflow="hidden">
                  <Text fontSize="xs" color="gray.400" fontWeight="bold">
                    EMAIL
                  </Text>
                  <Text
                    color="white"
                    fontSize="sm"
                    fontWeight="medium"
                    isTruncated
                  >
                    {mockProfesor.email}
                  </Text>
                </Box>
              </Flex>

              <Flex
                bg="whiteAlpha.50"
                p="4"
                borderRadius="xl"
                align="center"
                gap="3"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="0.2s"
                _hover={{ borderColor: "green.500", bg: "whiteAlpha.100" }}
              >
                <Box p="2" bg="green.900" color="green.200" borderRadius="lg">
                  <FiPhone size="20" />
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.400" fontWeight="bold">
                    TELEFON
                  </Text>
                  <Text color="white" fontSize="sm" fontWeight="medium">
                    {mockProfesor.telefon}
                  </Text>
                </Box>
              </Flex>
            </Grid>

            {/* Separator */}
            <Box as="hr" border="none" h="1px" bg="whiteAlpha.200" mb="6" />

            {/* Departamente */}
            <Box>
              <Stack
                direction="row"
                align="center"
                mb="4"
                color="purple.300"
                gap="2"
              >
                <Icon as={FiBriefcase} />
                <Text fontWeight="bold" letterSpacing="wide" fontSize="sm">
                  AFILIERE ACADEMICĂ & ROLURI
                </Text>
              </Stack>

              <Stack gap="3" pb="4">
                {mockProfesor.departamente.map((item, index) => (
                  <Flex
                    key={index}
                    bg="rgba(13, 16, 30, 0.6)"
                    p="4"
                    borderRadius="lg"
                    align="center"
                    justify="space-between"
                    borderLeft="4px solid"
                    borderColor={
                      item.rolDepartament === "DIRECTOR"
                        ? "purple.500"
                        : "blue.500"
                    }
                  >
                    <Box>
                      <Text
                        color="gray.400"
                        fontSize="xs"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        DEPARTAMENT
                      </Text>
                      <Text color="white" fontWeight="semibold">
                        {item.departament.nume}
                      </Text>
                    </Box>

                    <Badge
                      colorPalette={
                        item.rolDepartament === "DIRECTOR" ? "purple" : "blue"
                      }
                      variant="subtle"
                      px="3"
                      py="1"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      gap="2"
                    >
                      {item.rolDepartament === "DIRECTOR" && (
                        <Icon as={FiAward} />
                      )}
                      {item.rolDepartament}
                    </Badge>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfesorDetailsModal;
