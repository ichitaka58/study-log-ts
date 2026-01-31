import { Button, CloseButton, Drawer } from '@chakra-ui/react';
import React from 'react'

type Props = {
  open: boolean;
  onOpenChange: (e: { open: boolean }) => void;
  onClickHome: () => void;
  onClickStudyRecords: () => void;
  onClickSetting: () => void;
};

const MenuDrawer = ({
  open,
  onOpenChange,
  onClickHome,
  onClickStudyRecords,
  onClickSetting,
}: Props) => {
  return (
    <Drawer.Root placement="end" open={open} onOpenChange={onOpenChange}>
      <Drawer.Backdrop />
      <Drawer.Trigger />
      <Drawer.Positioner>
        <Drawer.Content bg="gray.100">
          <Drawer.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Drawer.CloseTrigger>
          <Drawer.Header>
            <Drawer.Title />
          </Drawer.Header>
          <Drawer.Body>
            <Button w="100%" onClick={onClickHome} variant="ghost">
              HOME
            </Button>
            <Button w="100%" onClick={onClickStudyRecords} variant="ghost">
              学習記録
            </Button>
            <Button w="100%" onClick={onClickSetting} variant="ghost">
              設定
            </Button>
          </Drawer.Body>
          <Drawer.Footer />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default MenuDrawer;