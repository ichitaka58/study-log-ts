import Header from "@/layout/Header";
import { mockStudyRecords } from "@/mocks/mockStudyRecords";
import { Container, Flex, For, Stack, Table, Text } from "@chakra-ui/react";
import React from "react";

const StudyRecords = () => {
  return (
    <>
      <Header />
      <Container maxW="xl">
        <Stack>
          <Flex as="h2" align="center" justify="center" direction="column" my={6}>
            <Text fontSize="4xl" fontWeight="bold">
              学習記録一覧
            </Text>
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
                <Table.ColumnHeader fontWeight="bold">編集</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="bold">削除</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mockStudyRecords.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>{item.time} 時間</Table.Cell>
                  <Table.Cell>編集</Table.Cell>
                  <Table.Cell>削除</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      </Container>
    </>
  );
};

export default StudyRecords;
