import React, { useEffect, useState } from "react";
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
  Spinner,
  Link,
} from "@chakra-ui/react";
import {
  FiUsers,
  FiLayers,
  FiAward,
  FiActivity,
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiExternalLink,
  FiWifi,
  FiWifiOff,
} from "react-icons/fi";

const Home = () => {
  const [departamente, setDepartamente] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [serverHealth, setServerHealth] = useState({
    isOnline: false,
    latency: null,
    statusText: "Se verifică...",
    color: "gray",
  });

  const [stats, setStats] = useState([
    {
      label: "Total Profesori",
      value: "0",
      change: "loading...",
      color: "blue",
      icon: FiUsers,
      gradient: "linear(to-br, blue.600, blue.900)",
    },
    {
      label: "Departamente",
      value: "0",
      change: "Active",
      color: "purple",
      icon: FiLayers,
      gradient: "linear(to-br, purple.600, purple.900)",
    },
    {
      label: "Directori Numiți",
      value: "0",
      change: "din total dept.",
      color: "green",
      icon: FiAward,
      gradient: "linear(to-br, green.600, green.900)",
    },
    {
      label: "Medie Prof/Dept",
      value: "0",
      change: "Grad ocupare",
      color: "orange",
      icon: FiActivity,
      gradient: "linear(to-br, orange.600, orange.900)",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const [resProfesori, resDepartamente] = await Promise.all([
          fetch("http://localhost:8080/profesori"),
          fetch("http://localhost:8080/departamente"),
        ]);

        const dataProfesori = await resProfesori.json();
        const dataDepartamenteRaw = await resDepartamente.json();

        const departamenteProcesate = dataDepartamenteRaw.map((dept) => {
          const membriDepartament = dataProfesori.filter(
            (prof) =>
              prof.departamente &&
              prof.departamente.some(
                (d) =>
                  d.id === dept.id ||
                  (d.departament && d.departament.id === dept.id),
              ),
          );

          const profesoriMapati = membriDepartament.map((prof) => {
            const legatura = prof.departamente.find(
              (d) =>
                d.id === dept.id ||
                (d.departament && d.departament.id === dept.id),
            );
            return {
              profesor: prof,
              rolDepartament: legatura ? legatura.rolDepartament : "Membru",
            };
          });

          return { ...dept, profesori: profesoriMapati };
        });

        setDepartamente(departamenteProcesate);

        let countDirectori = 0;
        departamenteProcesate.forEach((dept) => {
          if (
            dept.profesori &&
            dept.profesori.some((p) => p.rolDepartament === "Director")
          ) {
            countDirectori++;
          }
        });

        const medie =
          departamenteProcesate.length > 0
            ? (dataProfesori.length / departamenteProcesate.length).toFixed(1)
            : "0";

        setStats([
          {
            label: "Total Profesori",
            value: dataProfesori.length.toString(),
            change: "Actualizat",
            color: "blue",
            icon: FiUsers,
            gradient: "linear(to-br, blue.600, blue.900)",
          },
          {
            label: "Departamente",
            value: departamenteProcesate.length.toString(),
            change: "Total",
            color: "purple",
            icon: FiLayers,
            gradient: "linear(to-br, purple.600, purple.900)",
          },
          {
            label: "Directori Numiți",
            value: `${countDirectori} / ${departamenteProcesate.length}`,
            change: "Acoperire",
            color: "green",
            icon: FiAward,
            gradient: "linear(to-br, green.600, green.900)",
          },
          {
            label: "Medie Prof/Dept",
            value: medie,
            change: "Distribuție",
            color: "orange",
            icon: FiActivity,
            gradient: "linear(to-br, orange.600, orange.900)",
          },
        ]);
      } catch (error) {
        console.error("Eroare la fetch dashboard:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkServer = async () => {
      const start = Date.now();
      try {
        const res = await fetch("http://localhost:8080/profesori/ping");
        const end = Date.now();
        const latency = end - start;

        if (res.ok) {
          setServerHealth({
            isOnline: true,
            latency: latency,
            statusText: "Online",
            color: latency > 200 ? "orange" : "blue",
          });
        } else {
          setServerHealth({
            isOnline: true,
            latency: latency,
            statusText: `Eroare ${res.status}`,
            color: "orange",
          });
        }
      } catch (error) {
        setServerHealth({
          isOnline: false,
          latency: null,
          statusText: "Offline",
          color: "red",
        });
      }
    };

    checkServer();
    const intervalId = setInterval(checkServer, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const getDirectorName = (dept) => {
    if (!dept.profesori || dept.profesori.length === 0) return "Nedesemnat";
    const directorEntry = dept.profesori.find(
      (p) => p.rolDepartament === "Director",
    );
    if (directorEntry && directorEntry.profesor) {
      return `${directorEntry.profesor.nume} ${directorEntry.profesor.prenume}`;
    }
    return "Nedesemnat";
  };

  return (
    <Stack gap="8" align="stretch" w="100%" maxW="100%" overflowX="hidden">
      <Flex justify="space-between" align="center" wrap="wrap" gap="4">
        <Box>
          <Heading size="xl" color="white" mb="2">
            Dashboard Overview
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
            Data: {new Date().toLocaleDateString("ro-RO")}
          </Text>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="6">
        {stats.map((stat, index) => (
          <Box
            key={index}
            bg="rgba(13, 16, 30, 0.6)"
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
            {isLoadingData ? (
              <Spinner size="sm" color="white" mt="2" />
            ) : (
              <Heading size="2xl" color="white" mt="1">
                {stat.value}
              </Heading>
            )}
          </Box>
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", xl: "3fr 1fr" }} gap="6">
        <Box
          bg="rgba(13, 16, 30, 0.7)"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          boxShadow="xl"
          p="0"
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
                    NR. MEMBRI
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400">
                    STATUS
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray.400" textAlign="right" pr="6">
                    CONTACT / INFO
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {isLoadingData ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={5}
                      textAlign="center"
                      py="10"
                      color="white"
                    >
                      <Spinner size="xl" />
                    </Table.Cell>
                  </Table.Row>
                ) : departamente.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={5}
                      textAlign="center"
                      py="4"
                      color="gray.400"
                    >
                      Nu există departamente.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  departamente.map((dept) => {
                    const directorName = getDirectorName(dept);
                    const hasDirector = directorName !== "Nedesemnat";
                    const nrMembri = dept.profesori ? dept.profesori.length : 0;
                    return (
                      <Table.Row
                        key={dept.id}
                        _hover={{ bg: "whiteAlpha.50" }}
                        borderColor="whiteAlpha.50"
                        transition="0.2s"
                      >
                        <Table.Cell pl="6" fontWeight="bold" color="white">
                          {dept.nume}
                        </Table.Cell>
                        <Table.Cell color="gray.300">
                          <Flex align="center" gap="2">
                            <Box
                              w="6px"
                              h="6px"
                              borderRadius="full"
                              bg={hasDirector ? "blue.400" : "red.400"}
                            />
                            <Text fontSize="sm">{directorName}</Text>
                          </Flex>
                        </Table.Cell>
                        <Table.Cell color="gray.400">
                          <Flex align="center" gap="2">
                            <Icon as={FiUsers} /> {nrMembri}
                          </Flex>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            colorPalette={hasDirector ? "green" : "orange"}
                            variant="solid"
                            borderRadius="full"
                          >
                            {hasDirector ? "Activ" : "Fără Director"}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell textAlign="right" pr="6">
                          <Stack align="flex-end" gap="0">
                            <Text
                              color="gray.300"
                              fontSize="xs"
                              fontWeight="bold"
                            >
                              {dept.telefon || "-"}
                            </Text>
                            {dept.linkWeb && (
                              <Link
                                href={dept.linkWeb}
                                isExternal
                                fontSize="xs"
                                color="blue.300"
                                display="flex"
                                alignItems="center"
                              >
                                Web <Icon as={FiExternalLink} ml="1" />
                              </Link>
                            )}
                          </Stack>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                )}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        <Stack gap="6">
          <Box
            bgGradient="linear(to-b, blue.900, rgba(13, 16, 30, 0.9))"
            borderRadius="2xl"
            p="6"
            border="1px solid"
            borderColor={serverHealth.isOnline ? "blue.700" : "red.700"}
          >
            <Heading size="sm" color="white" mb="4">
              Stare Server (Live)
            </Heading>

            <Stack gap="4">
              <Box>
                <Flex justify="space-between" mb="1">
                  <Text fontSize="xs" color="blue.200">
                    API Status
                  </Text>
                  <Text
                    fontSize="xs"
                    color={serverHealth.isOnline ? "green.300" : "red.300"}
                    fontWeight="bold"
                  >
                    {serverHealth.statusText}
                  </Text>
                </Flex>

                <Progress.Root
                  value={serverHealth.isOnline ? 100 : 100}
                  colorPalette={
                    serverHealth.isOnline ? serverHealth.color : "red"
                  }
                  size="sm"
                  striped={serverHealth.isOnline}
                >
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
                <Icon
                  as={serverHealth.isOnline ? FiWifi : FiWifiOff}
                  color={serverHealth.isOnline ? "green.400" : "red.400"}
                  boxSize="6"
                />
                <Box>
                  <Text fontSize="sm" color="white" fontWeight="bold">
                    {serverHealth.isOnline
                      ? "Conexiune Stabilă"
                      : "Server Deconectat"}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    Backend: port 8080{" "}
                    {serverHealth.latency !== null &&
                      `• Ping: ${serverHealth.latency}ms`}
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Box>

          <Box
            bg="rgba(13, 16, 30, 0.6)"
            borderRadius="2xl"
            p="6"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Heading size="sm" color="white" mb="4">
              Rezumat Rapid
            </Heading>
            <Stack gap="3">
              <HStack align="start">
                <Icon as={FiCheckCircle} color="blue.400" mt="1" />
                <Box>
                  <Text fontSize="xs" color="gray.300">
                    Au fost încărcate{" "}
                    <Text as="span" color="white" fontWeight="bold">
                      {departamente.length} departamente
                    </Text>
                    .
                  </Text>
                </Box>
              </HStack>
              {departamente.some((d) => getDirectorName(d) !== "Nedesemnat") ? (
                <HStack align="start">
                  <Icon as={FiCheckCircle} color="green.400" mt="1" />
                  <Box>
                    <Text fontSize="xs" color="gray.300">
                      Există departamente cu{" "}
                      <Text as="span" color="white" fontWeight="bold">
                        Directori numiți
                      </Text>
                      .
                    </Text>
                  </Box>
                </HStack>
              ) : (
                <HStack align="start">
                  <Icon as={FiAlertCircle} color="orange.400" mt="1" />
                  <Box>
                    <Text fontSize="xs" color="gray.300">
                      Atenție: Unele departamente nu au{" "}
                      <Text as="span" color="white" fontWeight="bold">
                        Director
                      </Text>
                      .
                    </Text>
                  </Box>
                </HStack>
              )}
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Home;
