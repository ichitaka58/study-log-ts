import Header from "@/layout/Header";
import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Header />
      <Flex align="center" justify="center" minH="100vh" direction="column">
        <Text fontSize="4xl" fontWeight="bold">
          Not Found
        </Text>
        <Link href="/">ホームに戻る</Link>
      </Flex>
    </>
  );
};

export default NotFound;
