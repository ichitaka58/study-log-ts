import MenuDrawer from "@/components/Drawers/MenuDrawer";
import PATHS from "@/router/paths";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const onClickHome = () => {
    navigate(PATHS.HOME);
    setOpen(false);
  };
  const onClickStudyRecords = () => {
    navigate(PATHS.STUDY_RECORDS);
    setOpen(false);
  };
  const onClickSetting = () => {
    navigate(PATHS.SETTING);
    setOpen(false);
  };

  return (
    <>
      <Flex
        as="nav"
        bg="yellow.400"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Link to={PATHS.HOME}>
          <Heading
            as="h1"
            fontSize={{ base: "md", md: "lg" }}
            mr={4}
            textAlign="center"
          >
            シン・学習記録アプリ
          </Heading>
        </Link>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
          gap="4"
        >
          <Box>
            <Link to={PATHS.STUDY_RECORDS}>学習記録</Link>
          </Box>
          <Box>
            <Link to={PATHS.SETTING}>設定</Link>
          </Box>
        </Flex>
        <MenuDrawer
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          onClickHome={onClickHome}
          onClickStudyRecords={onClickStudyRecords}
          onClickSetting={onClickSetting}
        >
          <IconButton
            variant="ghost"
            _hover={{ bg: "yellow.200" }}
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
          >
            <Menu />
          </IconButton>
        </MenuDrawer>
      </Flex>
    </>
  );
};

export default Header;
