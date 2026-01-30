import { Box, CloseButton, Dialog } from '@chakra-ui/react';
import StudyRecordForm from '../StudyRecordForm';
import type { StudyRecordInsert } from '@/types/studyRecord';

type Props = {
  open: boolean;
  onOpenChange: (e: {open: boolean}) => void;
  onCreate: (record:StudyRecordInsert) => Promise<void>;
}

const StudyRecordFormModal = ({ open, onOpenChange, onCreate }: Props) => {
  return (
    <Dialog.Root
      size={{ smDown: "xs", sm: "sm" }}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>新規登録</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Box>
              <StudyRecordForm
                onClose={() => onOpenChange({ open: false })}
                onCreate={onCreate}
              />
            </Box>
          </Dialog.Body>
          <Dialog.Footer />
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

export default StudyRecordFormModal;