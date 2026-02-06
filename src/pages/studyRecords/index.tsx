import ConfirmDeleteModal from "@/components/comfirmModals/ConfirmDeleteModal";
import StudyRecordFormModal from "@/components/StudyRecordFormModal";
import { useStudyRecord } from "@/hooks/useStudyRecord";
import Header from "@/layout/Header";
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

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  // レコード編集、削除共通の選択されたレコードをstateにセット
  const [selectedRecord, setSelectedRecord] = useState<StudyRecord | null>(null);

  const onClickEdit = (record: StudyRecord) => {
    setSelectedRecord(record);
    setIsEditOpen(true);
  };

  const onClickDelete = (record: StudyRecord) => {
    setSelectedRecord(record);
    setIsDeleteOpen(true);
  };

  // onOpenChange=モーダルが開いた、閉じたを教えてくれる
  const onEditOpenChange = (e: { open: boolean }) => {
    setIsEditOpen(e.open);
    // 閉じた時＝>e.open:false => !e.open:trueとなり、レコードをクリア
    if (!e.open) setSelectedRecord(null);
  };

  const onDeleteOpenChange = (e: { open: boolean }) => {
    setIsDeleteOpen(e.open);
    if (!e.open) setSelectedRecord(null);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Center h="100vh" aria-label="loading">
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
              <Text
                fontSize={{ base: "2xl", lg: "4xl" }}
                fontWeight="bold"
                textDecoration="underline"
                textDecorationColor="yellow.400"
              >
                学習記録一覧
              </Text>
            </Flex>
            <Flex justify="end" align="center" my={2}>
              <Button
                size={{ base: "sm", lg: "lg" }}
                colorPalette="yellow"
                onClick={() => {
                  setSelectedRecord(null);
                  setIsEditOpen(true);
                }}
              >
                新規登録
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
                        <Button
                          aria-label="削除"
                          onClick={() => onClickDelete(record)}
                          style={{ cursor: "pointer" }}
                          variant="ghost"
                          size="xs"
                        >
                          <Trash2 />
                        </Button>
                      </Center>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
          <StudyRecordFormModal
            open={isEditOpen}
            onOpenChange={onEditOpenChange}
            initialValue={selectedRecord}
            onCreate={createStudyRecord}
            onUpdate={updatedStudyRecord}
          />
          <ConfirmDeleteModal
            open={isDeleteOpen && selectedRecord !== null}
            onOpenChange={onDeleteOpenChange}
            selectedRecord={selectedRecord}
            onDelete={deleteStudyRecord}
          />
        </Container>
      )}
    </>
  );
};

export default StudyRecords;
