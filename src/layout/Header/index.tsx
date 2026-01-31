import MenuIconButton from "@/components/button/MenuIconButton";
import MenuDrawer from "@/components/Drawers/MenuDrawer";
import PATHS from "@/router/paths";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onClickHome = () => navigate(PATHS.HOME);
  const onClickStudyRecords = () => navigate(PATHS.STUDY_RECORDS);
  const onClickSetting = () => navigate(PATHS.SETTING);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Flex
        as="nav"
        bg="yellow.400"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
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
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
          gap="4"
        >
          <Box>
            <Link onClick={onClickStudyRecords}>学習記録</Link>
          </Box>
          <Box>
            <Link onClick={onClickSetting}>設定</Link>
          </Box>
        </Flex>
        <MenuIconButton onClick={() => setOpen(true)} />
      </Flex>
      <MenuDrawer
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        onClickHome={onClickHome}
        onClickStudyRecords={onClickStudyRecords}
        onClickSetting={onClickSetting}
      />
    </>
  );
};

export default Header;
