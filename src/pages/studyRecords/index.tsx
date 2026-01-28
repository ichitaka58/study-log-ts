import PencilSquare from "@/components/icons/PencilSquare";
import TrashIcon from "@/components/icons/TrashIcon";
import Header from "@/layout/Header";
import { mockStudyRecords } from "@/mocks/mockStudyRecords";
import { Button, Center, Container, Flex, Stack, Table, Text } from "@chakra-ui/react";
import { useState } from "react";

const StudyRecords = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header />
      {isLoading ? (
        <Text>Loading...</Text>
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
              <Button size={{ base: "sm", lg: "lg" }} colorPalette="yellow">
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
                {mockStudyRecords.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.time} 時間</Table.Cell>
                    <Table.Cell>
                      <Center>
                        <PencilSquare size={16} />
                      </Center>
                    </Table.Cell>
                    <Table.Cell>
                      <Center>
                        <TrashIcon size={16} />
                      </Center>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default StudyRecords;
