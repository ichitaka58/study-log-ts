import { Box, CloseButton, Dialog } from '@chakra-ui/react';
import StudyRecordForm from '../StudyRecordForm';
import type { StudyRecord, StudyRecordInsert, StudyRecordUpdate } from '@/types/studyRecord';

type Props = {
  open: boolean;
  onOpenChange: (e: {open: boolean}) => void;
  initialValue: StudyRecord | null;
  onCreate: (record: StudyRecordInsert) => Promise<void>;
  onUpdate: (record: StudyRecordUpdate) => Promise<void>;

}


const StudyRecordFormModal = ({ open, onOpenChange, initialValue, onCreate, onUpdate }: Props) => {

  const isEdit = !!initialValue;

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
            <Dialog.Title>{ isEdit ? "記録編集" : "新規登録" }</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Box>
              <StudyRecordForm
                onClose={() => onOpenChange({ open: false })}
                initialValue={initialValue}
                onCreate={onCreate}
                onUpdate={onUpdate}
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