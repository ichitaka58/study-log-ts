import { Box, Flex, Heading, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  const onClickHome = () => navigate("/");
  return (
    <Flex as="nav" bg="yellow.400" align="center" justify="space-between" padding={{ base: 3, md: 5}}>
      <Flex
        as="a"
        align="center"
        _hover={{ cursor: "pointer" }}
        onClick={onClickHome}
      >
        <Heading as="h1" fontSize={{ base: "md", md: "lg" }} mr={4}>
          シン・学習記録アプリ
        </Heading>
      </Flex>
      <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex"}} gap="4">
        <Box>
          <Link href="/study_records">学習記録</Link>
        </Box>
        <Box>
          <Link href="/setting">設定</Link>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Header;