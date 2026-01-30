import PencilSquare from "@/components/icons/PencilSquare";
import TrashIcon from "@/components/icons/TrashIcon";
import StudyRecordFormModal from "@/components/StudyRecordFormModal";
import { useStudyRecord } from "@/hooks/useStudyRecord";
import Header from "@/layout/Header";
import { mockStudyRecords } from "@/mocks/mockStudyRecords";
import { Button, Center, Container, Flex, Spinner, Stack, Table, Text } from "@chakra-ui/react";
import { useState } from "react";

const StudyRecords = () => {
  const { studyRecords, loading, createStudyRecord, deleteStudyRecord } = useStudyRecord();
  const [open, setOpen] = useState<boolean>(false);

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
                        <button>
                          <PencilSquare size={16} />
                        </button>
                      </Center>
                    </Table.Cell>
                    <Table.Cell>
                      <Center>
                        <button
                          aria-label="削除"
                          onClick={() => deleteStudyRecord(record.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <TrashIcon size={16} />
                        </button>
                      </Center>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
          <StudyRecordFormModal
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            onCreate={createStudyRecord}
          />
        </Container>
      )}
    </>
  );
};

export default StudyRecords;
