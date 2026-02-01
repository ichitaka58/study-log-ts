import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  onDelete: () => Promise<void>;
  title: string;
  children: ReactNode;
};

const ConfirmDeleteModal = ({ onDelete, title, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
      setOpen(false); // 成功したら閉じる
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      role="alertdialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>削除確認</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>本当に学習記録"{title}"を削除しますか？</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={handleDelete}
                colorPalette="red"
                loading={loading}
              >
                削除
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmDeleteModal;
