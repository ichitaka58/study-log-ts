import { beforeEach, describe, expect, test, vi } from "vitest";

// StudyRecordApiをモック
const getAllMock = vi.fn();
const createMock = vi.fn();

// ファイルの一番上で実行されるため、importより前に書く
vi.mock("@/api/studyRecordApi", () => {
  class StudyRecordApi {
    getAll = getAllMock;
    create = createMock;
  }
  return { StudyRecordApi };
});

import { mockStudyRecords } from "@/mocks/mockStudyRecords";
import PATHS from "@/router/paths";
import { renderWithProviders } from "@/test/render";
import { screen, waitFor, within } from "@testing-library/react";
import StudyRecords from "@/pages/studyRecords";

// 呼び出し履歴や返り値をリセット
beforeEach(() => {
  vi.clearAllMocks();
});

describe("学習記録一覧ページ", () => {

  test("ローディング画面を見ることができる", async () => {
    // getAllが解決しない Promise → ずっとローディング
    getAllMock.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);

    expect(screen.getByLabelText("loading")).toBeInTheDocument();
  });

  test("テーブルを見ることができる＆新規登録ボタンがある", async () => {
    getAllMock.mockResolvedValue(mockStudyRecords);

    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);

    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();

    const createBtn = screen.getByRole("button", { name: "新規登録" });
    expect(createBtn).toBeInTheDocument();

    expect(within(table).getByText("React")).toBeInTheDocument();
    expect(within(table).getByText("PHP")).toBeInTheDocument();
    expect(within(table).getByText("Next.js")).toBeInTheDocument();
  });
});
