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
          bg="gray.600"
          p={5}
          shadow="md"
          borderRadius="lg"
          borderTop="4px solid"
          borderColor="blue.500"
        >
          <Text color="gray.50" fontWeight="medium" fontSize="sm">
            Total Profesori
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            24
          </Text>
          <Text fontSize="xs" color="gray.100">
            +2 adăugați recent
          </Text>
        </Box>

        <Box
          bg="gray.600"
          p={5}
          shadow="md"
          borderRadius="lg"
          borderTop="4px solid"
          borderColor="green.500"
        >
          <Text color="gray.50" fontWeight="medium" fontSize="sm">
            Departamente
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            6
          </Text>
          <Text fontSize="xs" color="gray.100">
            Toate active
          </Text>
        </Box>

        <Box
          bg="gray.600"
          p={5}
          shadow="md"
          borderRadius="lg"
          borderTop="4px solid"
          borderColor="orange.500"
        >
          <Text color="gray.50" fontWeight="medium" fontSize="sm">
            Directori Activi
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            6
          </Text>
          <Text fontSize="xs" color="gray.100">
            1 post vacant
          </Text>
        </Box>
      </SimpleGrid>

      <Box bg="gray.600" shadow="md" borderRadius="lg" p={6} overflowX="auto">
        <Heading size="md" mb={4}>
          Departamente Active
        </Heading>
        <Table.ScrollArea
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          rounded="xl"
          height="300px"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)"
          bg="gray.950"
        >
          <Table.Root size="md" variant="line" stickyHeader>
            <Table.Header>
              <Table.Row
                bg="gray.900"
                borderBottomWidth="2px"
                borderColor="blue.500"
              >
                <Table.ColumnHeader
                  color="blue.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Product
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  color="blue.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Category
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  color="blue.300"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  textAlign="end"
                >
                  Price
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((item) => (
                <Table.Row
                  key={item.id}
                  _hover={{ bg: "whiteAlpha.100", transition: "0.2s" }} // Efect de hover
                  borderBottomColor="whiteAlpha.100"
                >
                  <Table.Cell fontWeight="medium" color="gray.100">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>
                    {/* Badge pentru categorie */}
                    <span
                      style={{
                        background: "rgba(66, 153, 225, 0.15)",
                        color: "#63b3ed",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {item.category}
                    </span>
                  </Table.Cell>
                  <Table.Cell
                    textAlign="end"
                    fontWeight="bold"
                    color="green.400"
                  >
                    ${item.price}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Stack>
  );
};
const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
export default Home;
