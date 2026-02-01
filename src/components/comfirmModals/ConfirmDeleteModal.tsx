import type { StudyRecord } from "@/types/studyRecord";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (e: { open: boolean }) => void;
  selectedRecord: StudyRecord | null;
  onDelete: (id: number) => Promise<void>;
};

const ConfirmDeleteModal = ({ open, onOpenChange, selectedRecord, onDelete }: Props) => {
  
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if(!selectedRecord) return;
    setLoading(true);
    try {
      await onDelete(selectedRecord.id);
      onOpenChange({open: false}); // 成功したら閉じる
    }finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root role="alertdialog" open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>削除確認</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>本当に学習記録"{selectedRecord?.title}"を削除しますか？</p>
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
                disabled={!selectedRecord || loading}
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
