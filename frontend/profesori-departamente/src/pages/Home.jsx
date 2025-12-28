import {
  SimpleGrid,
  Table,
  Badge,
  Stack,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <Stack gap="8" align="stretch">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        <Box
          bg="gray"
          p={5}
          shadow="md"
          borderRadius="lg"
          borderTop="4px solid"
          borderColor="blue.500"
        >
          <Text color="gray.500" fontWeight="medium" fontSize="sm">
            Total Profesori
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            24
          </Text>
          <Text fontSize="xs" color="gray.400">
            +2 adăugați recent
          </Text>
        </Box>

        <Box
          bg="white"
          p={5}
          shadow="md"
          borderRadius="lg"
          borderTop="4px solid"
          borderColor="green.500"
        >
          <Text color="gray.500" fontWeight="medium" fontSize="sm">
            Departamente
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            6
          </Text>
          <Text fontSize="xs" color="gray.400">
            Toate active
          </Text>
        </Box>

        <Box
          bg="white"
          p={5}
          shadow="md"
          borderRadius="lg"
          borderTop="4px solid"
          borderColor="orange.500"
        >
          <Text color="gray.500" fontWeight="medium" fontSize="sm">
            Directori Activi
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            6
          </Text>
          <Text fontSize="xs" color="gray.400">
            1 post vacant
          </Text>
        </Box>
      </SimpleGrid>

      {/* Tabel Activitate Recentă */}
      <Box bg="white" shadow="md" borderRadius="lg" p={6} overflowX="auto">
        <Heading size="md" mb={4}>
          Departamente Recente
        </Heading>
        {/* În v3, Table se folosește adesea direct dacă nu ai snippet-ul instalat */}
        <Table.Root variant="line" size="sm">
          <Table.Header bg="gray.50">
            <Table.Row>
              <Table.ColumnHeader p={4}>Nume Departament</Table.ColumnHeader>
              <Table.ColumnHeader p={4}>Director</Table.ColumnHeader>
              <Table.ColumnHeader p={4}>Status</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row _hover={{ bg: "gray.50" }}>
              <Table.Cell p={4} fontWeight="medium">
                Telecomunicații
              </Table.Cell>
              <Table.Cell p={4}>Șerban Obreja</Table.Cell>
              <Table.Cell p={4}>
                <Badge colorPalette="green" variant="solid">
                  Activ
                </Badge>
              </Table.Cell>
            </Table.Row>
            <Table.Row _hover={{ bg: "gray.50" }}>
              <Table.Cell p={4} fontWeight="medium">
                Electronică
              </Table.Cell>
              <Table.Cell p={4}>Andrei Alexandru</Table.Cell>
              <Table.Cell p={4}>
                <Badge colorPalette="green" variant="solid">
                  Activ
                </Badge>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </Stack>
  );
};

export default Home;
