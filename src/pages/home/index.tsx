import Header from "@/layout/Header";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <>
      <Header />
      <Flex align="center" justify="center" minH="100vh" direction="column">
        <Text fontSize="4xl" fontWeight="bold">
          Home
        </Text>
        <Text fontSize="2xl">日々の学習を記録する。</Text>
      </Flex>
    </>
  );
};

export default Home;
