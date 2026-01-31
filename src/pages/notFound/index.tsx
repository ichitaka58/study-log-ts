import Header from "@/layout/Header";
import PATHS from "@/router/paths";
import { Flex, Link, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <>
      <Header />
      <Flex align="center" justify="center" minH="100vh" direction="column">
        <Text fontSize="4xl" fontWeight="bold">
          Not Found
        </Text>
        <Link href={PATHS.HOME}>ホームに戻る</Link>
      </Flex>
    </>
  );
};

export default NotFound;
