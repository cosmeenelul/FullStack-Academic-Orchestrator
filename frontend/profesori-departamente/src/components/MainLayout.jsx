import React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterNavLink, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiLayers, FiLogOut } from "react-icons/fi";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Flex h="100vh" overflow="hidden">
      <Box
        w="260px"
        bg="bg.muted"
        color="white"
        display="flex"
        flexDirection="column"
      >
        <Box p={8} textAlign="center">
          <Heading size="md" color="blue.200" letterSpacing="wider">
            EDU MANAGER
          </Heading>
          <Text fontSize="xs" color="blue.400" mt={1}>
            University System
          </Text>
        </Box>

        <Stack gap="2" px={4} flex="1">
          <NavItem
            to="/"
            icon={FiHome}
            _focus={{ outline: "none" }}
            _focusVisible={{ outline: "none" }}
            active={isActive("/")}
          >
            Dashboard
          </NavItem>
          <NavItem
            to="/departamente"
            icon={FiLayers}
            active={isActive("/departamente")}
          >
            Departamente
          </NavItem>
          <NavItem
            to="/profesori"
            icon={FiUsers}
            active={isActive("/profesori")}
          >
            Profesori
          </NavItem>
        </Stack>

        <Box p={4} borderTopWidth="1px" borderColor="blue.800">
          <Flex
            align="center"
            p={3}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "red.600" }}
          >
            <FiLogOut style={{ marginRight: "12px" }} />
            <Text fontWeight="medium">Ieșire</Text>
          </Flex>
        </Box>
      </Box>

      <Box flex="1" bg="gray.800" display="flex" flexDirection="column">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          px={8}
          py={4}
          bg="bg.muted"
          boxShadow="sm"
        >
          <Text fontSize="lg" fontWeight="semibold" color="white">
            {isActive("/")
              ? "Dashboard Overview"
              : isActive("/departamente")
              ? "Gestiune Departamente"
              : "Gestiune Profesori"}
          </Text>

          <Flex align="center" gap="4">
            <Box textAlign="right">
              <Text fontSize="sm" fontWeight="bold" color="white">
                Admin User
              </Text>
              <Text fontSize="xs" color="white">
                System Manager
              </Text>
            </Box>
            <Box w="10" h="10" bg="blue.500" borderRadius="full" />
          </Flex>
        </Flex>

        <Box flex="1" p={8} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

const NavItem = ({ to, icon, children }) => {
  return (
    <Box
      as={ReactRouterNavLink}
      to={to}
      width="100%"
      _focus={{ outline: "none", boxShadow: "none" }}
      _focusVisible={{ outline: "none", boxShadow: "none" }}
      display="flex"
      alignItems="center"
      p={3}
      borderRadius="lg"
      color="blue.100"
      transition="all 0.2s"
      _hover={{
        bg: "blue.800",
        color: "white",
      }}
      _activeLink={{
        bg: "blue.600",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {React.createElement(icon, {
        style: { marginRight: "12px", fontSize: "18px" },
      })}

      <Text>{children}</Text>
    </Box>
  );
};
export default MainLayout;
