import ConfirmDeleteModal from "@/components/comfirmModals/ConfirmDeleteModal";
import StudyRecordFormModal from "@/components/StudyRecordFormModal";
import { useStudyRecord } from "@/hooks/useStudyRecord";
import Header from "@/layout/Header";
import { mockStudyRecords } from "@/mocks/mockStudyRecords";
import type { StudyRecord } from "@/types/studyRecord";
import {
  Button,
  Center,
  Container,
  Flex,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { Trash2, SquarePen } from "lucide-react";
import { useState } from "react";

const StudyRecords = () => {
  const {
    studyRecords,
    loading,
    createStudyRecord,
    deleteStudyRecord,
    updatedStudyRecord,
  } = useStudyRecord();
  const [open, setOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<StudyRecord | null>(null);

  const onClickEdit = (record: StudyRecord) => {
    setEditingRecord(record);
    setOpen(true);
  };

  const onCloseModal = (e: { open: boolean }) => {
    setOpen(e.open);
    if (!e.open) setEditingRecord(null);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Center h="100vh">
          <Spinner size="xl" color="gray.600" />
        </Center>
      ) : (
        <Container maxW="xl">
          <Stack>
            <Flex
              as="h2"
              align="center"
              justify="center"
              direction="column"
              my={4}
            >
              <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold">
                学習記録一覧
              </Text>
            </Flex>
            <Flex justify="end" align="center" my={2}>
              <Button
                size={{ base: "sm", lg: "lg" }}
                colorPalette="yellow"
                onClick={() => setOpen(true)}
              >
                Entry
              </Button>
            </Flex>
            <Table.Root
              size={{ base: "sm", md: "md", lg: "lg" }}
              variant="outline"
              mx="auto"
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader fontWeight="bold">
                    学習内容
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">
                    学習時間
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    編集
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold" textAlign="center">
                    削除
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {studyRecords.map((record) => (
                  <Table.Row key={record.id}>
                    <Table.Cell>{record.title}</Table.Cell>
                    <Table.Cell>{record.time} 時間</Table.Cell>
                    <Table.Cell>
                      <Center>
                        <Button
                          aria-label="編集"
                          onClick={() => onClickEdit(record)}
                          style={{ cursor: "pointer" }}
                          variant="ghost"
                          size="xs"
                        >
                          <SquarePen />
                        </Button>
                      </Center>
                    </Table.Cell>
                    <Table.Cell>
                      <Center>
                        <ConfirmDeleteModal onDelete={() => deleteStudyRecord(record.id)} title={record.title}>
                          <Button
                            aria-label="削除"
                            style={{ cursor: "pointer" }}
                            variant="ghost"
                            size="xs"
                          >
                            <Trash2 />
                          </Button>
                        </ConfirmDeleteModal>
                      </Center>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
          <StudyRecordFormModal
            open={open}
            onOpenChange={onCloseModal}
            initialValue={editingRecord}
            onCreate={createStudyRecord}
            onUpdate={updatedStudyRecord}
          />
        </Container>
      )}
    </>
  );
};

export default StudyRecords;
