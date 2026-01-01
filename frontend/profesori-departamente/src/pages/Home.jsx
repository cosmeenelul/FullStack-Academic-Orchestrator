import React from "react";
import {
  SimpleGrid,
  Table,
  Badge,
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  HStack,
  Progress,
  Grid,
  Button, // <--- AM ADĂUGAT IMPORTUL LIPSĂ AICI
} from "@chakra-ui/react";
import {
  FiUsers,
  FiLayers,
  FiAward,
  FiActivity,
  FiTrendingUp,
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const Home = () => {
  // --- DATE MOCKUP (RELEVANTE PENTRU UNIVERSITATE) ---
  const stats = [
    {
      label: "Total Profesori",
      value: "42",
      change: "+4 luna asta",
      color: "blue",
      icon: FiUsers,
      gradient: "linear(to-br, blue.600, blue.900)",
    },
    {
      label: "Departamente",
      value: "8",
      change: "Toate active",
      color: "purple",
      icon: FiLayers,
      gradient: "linear(to-br, purple.600, purple.900)",
    },
    {
      label: "Directori Numiti",
      value: "8",
      change: "100% acoperire",
      color: "green",
      icon: FiAward,
      gradient: "linear(to-br, green.600, green.900)",
    },
    {
      label: "Grad Încărcare",
      value: "85%",
      change: "Nivel optim",
      color: "orange",
      icon: FiActivity,
      gradient: "linear(to-br, orange.600, orange.900)",
    },
  ];

  const departmentPerformance = [
    {
      id: 101,
      name: "Ingineria Sistemelor",
      director: "Popescu Andrei",
      members: 12,
      status: "Activ",
      budget: "95%",
    },
    {
      id: 102,
      name: "Automatică și Calc.",
      director: "Ionescu Maria",
      members: 24,
      status: "Activ",
      budget: "88%",
    },
    {
      id: 103,
      name: "Electronică Aplicată",
      director: "Vasilescu Dan",
      members: 9,
      status: "Revizie",
      budget: "60%",
    },
    {
      id: 104,
      name: "Telecomunicații",
      director: "Georgescu Elena",
      members: 15,
      status: "Activ",
      budget: "92%",
    },
    {
      id: 105,
      name: "Fizică",
      director: "Dumitrescu Ion",
      members: 6,
      status: "Activ",
      budget: "75%",
    },
  ];

  return (
    <Stack gap="8" align="stretch" w="100%" maxW="100%" overflowX="hidden">
      {/* --- HEADER DASHBOARD --- */}
      <Flex justify="space-between" align="center" wrap="wrap" gap="4">
        <Box>
          <Heading size="xl" color="white" mb="2">
            Dashboard Universitar
          </Heading>
          <Text color="gray.400">
            Privire de ansamblu asupra corpului profesoral și departamentelor.
          </Text>
        </Box>
        <HStack
          bg="whiteAlpha.100"
          p="2"
          borderRadius="lg"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <Icon as={FiCalendar} color="blue.300" />
          <Text color="white" fontSize="sm" fontWeight="bold">
            An Universitar: 2024 - 2025
          </Text>
        </HStack>
      </Flex>

      {/* --- STATS CARDS --- */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
        {stats.map((stat, index) => (
          <Box
            key={index}
            bg="rgba(13, 16, 30, 0.6)" // Dark transparent background
            backdropFilter="blur(10px)"
            p="6"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            position="relative"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-5px)",
              borderColor: `${stat.color}.500`,
              boxShadow: "lg",
            }}
          >
            {/* Background Glow Effect */}
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              w="100px"
              h="100px"
              bg={stat.gradient}
              filter="blur(40px)"
              opacity="0.3"
              borderRadius="full"
            />

            <Flex justify="space-between" align="start" mb="4">
              <Box p="3" bg="whiteAlpha.100" borderRadius="xl">
                <Icon as={stat.icon} boxSize="6" color={`${stat.color}.300`} />
              </Box>
              <Badge
                colorPalette={stat.color}
                variant="subtle"
                borderRadius="full"
                px="2"
              >
                <Icon as={FiTrendingUp} mr="1" /> {stat.change}
              </Badge>
            </Flex>

            <Text color="gray.400" fontSize="sm" fontWeight="medium">
              {stat.label}
            </Text>
            <Heading size="2xl" color="white" mt="1">
              {stat.value}
            </Heading>
          </Box>
        ))}
      </SimpleGrid>

      {/* --- CONTENT GRID: TABLE + SYSTEM STATUS --- */}
      <Grid templateColumns={{ base: "1fr", xl: "3fr 1fr" }} gap="6">
        {/* PARTEA STANGA: TABEL DEPARTAMENTE */}
        <Box
          bg="rgba(13, 16, 30, 0.7)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          boxShadow="xl"
          p="0" // Reset padding for cleaner table
          overflow="hidden"
        >
          <Flex
            p="6"
            borderBottom="1px solid"
            borderColor="whiteAlpha.100"
            justify="space-between"
            align="center"
          >
            <Heading size="md" color="white">
              Performanță Departamente
            </Heading>
            <Button size="xs" variant="ghost" color="blue.300">
              Vezi Toate
            </Button>
          </Flex>

          <Box overflowX="auto">
            <Table.Root variant="simple" size="md">
              <Table.Header bg="whiteAlpha.50">
                <Table.Row borderColor="whiteAlpha.100">
                  <Table.ColumnHeader color="gray.400" pl="6">
                    DEPARTAMENT
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400">
                    DIRECTOR
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400">
                    MEMBRI
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400">
                    STATUS
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400" textAlign="right" pr="6">
                    BUGET
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {departmentPerformance.map((dept) => (
                  <Table.Row
                    key={dept.id}
                    _hover={{ bg: "whiteAlpha.50" }}
                    borderColor="whiteAlpha.50"
                    transition="0.2s"
                  >
                    <Table.Cell pl="6" fontWeight="bold" color="white">
                      {dept.name}
                    </Table.Cell>
                    <Table.Cell color="gray.300">
                      <Flex align="center" gap="2">
                        <Box
                          w="6px"
                          h="6px"
                          borderRadius="full"
                          bg="blue.400"
                        />
                        {dept.director}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell color="gray.400">
                      <Flex align="center" gap="2">
                        <Icon as={FiUsers} /> {dept.members}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette={
                          dept.status === "Activ" ? "green" : "orange"
                        }
                        variant="solid"
                        borderRadius="full"
                      >
                        {dept.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell
                      textAlign="right"
                      pr="6"
                      color="white"
                      fontWeight="bold"
                    >
                      {dept.budget}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        {/* PARTEA DREAPTA: STATUS SISTEM / ACTIUNI RAPIDE */}
        <Stack gap="6">
          {/* Quick Actions Panel */}
          <Box
            bgGradient="linear(to-b, blue.900, rgba(13, 16, 30, 0.9))"
            borderRadius="2xl"
            p="6"
            border="1px solid"
            borderColor="blue.700"
          >
            <Heading size="sm" color="white" mb="4">
              Stare Sistem
            </Heading>

            <Stack gap="4">
              <Box>
                <Flex justify="space-between" mb="1">
                  <Text fontSize="xs" color="blue.200">
                    Server Load
                  </Text>
                  <Text fontSize="xs" color="blue.200">
                    24%
                  </Text>
                </Flex>
                <Progress.Root value={24} colorPalette="blue" size="sm">
                  <Progress.Track bg="whiteAlpha.200">
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Box>
              <Box>
                <Flex justify="space-between" mb="1">
                  <Text fontSize="xs" color="purple.200">
                    Database
                  </Text>
                  <Text fontSize="xs" color="purple.200">
                    Stable
                  </Text>
                </Flex>
                <Progress.Root value={98} colorPalette="purple" size="sm">
                  <Progress.Track bg="whiteAlpha.200">
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Box>
            </Stack>

            <Box
              mt="6"
              pt="4"
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
            >
              <HStack gap="3">
                <Icon as={FiCheckCircle} color="green.400" />
                <Box>
                  <Text fontSize="sm" color="white" fontWeight="bold">
                    Sistemele sunt online
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    Ultimul check: acum 2 min
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Box>

          {/* Notifications Panel */}
          <Box
            bg="rgba(13, 16, 30, 0.6)"
            borderRadius="2xl"
            p="6"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Heading size="sm" color="white" mb="4">
              Notificări Recente
            </Heading>
            <Stack gap="3">
              <HStack align="start">
                <Icon as={FiAlertCircle} color="orange.400" mt="1" />
                <Box>
                  <Text fontSize="xs" color="gray.300">
                    <Text as="span" color="white" fontWeight="bold">
                      Electronică
                    </Text>{" "}
                    necesită validare buget.
                  </Text>
                  <Text fontSize="10px" color="gray.500">
                    Acum 2 ore
                  </Text>
                </Box>
              </HStack>
              <HStack align="start">
                <Icon as={FiCheckCircle} color="blue.400" mt="1" />
                <Box>
                  <Text fontSize="xs" color="gray.300">
                    Profesor nou adăugat în{" "}
                    <Text as="span" color="white" fontWeight="bold">
                      Automatică
                    </Text>
                    .
                  </Text>
                  <Text fontSize="10px" color="gray.500">
                    Ieri
                  </Text>
                </Box>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Home;
