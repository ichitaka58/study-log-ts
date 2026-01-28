import Header from "@/layout/Header";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Setting = () => {
  return (
    <>
      <Header />
      <Flex align="center" justify="center" minH="100vh" direction="column">
        <Text fontSize="4xl" fontWeight="bold">
          設定ページ
        </Text>
      </Flex>
    </>
  );
};

export default Setting;
