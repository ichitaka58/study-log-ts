import { beforeEach, describe, expect, test, vi } from "vitest";

// StudyRecordApiをモック
const getAllMock = vi.fn();
const createMock = vi.fn();
const updateMock = vi.fn();
const deleteMock = vi.fn();

// ファイルの一番上で実行されるため、importより前に書く
vi.mock("@/api/studyRecordApi", () => {
  class StudyRecordApi {
    getAll = getAllMock;
    create = createMock;
    update = updateMock;
    delete = deleteMock;
  }
  return { StudyRecordApi };
});

import { mockStudyRecords } from "@/mocks/mockStudyRecords";
import PATHS from "@/router/paths";
import { renderWithProviders } from "@/test/render";
import { screen, waitFor, within } from "@testing-library/react";
import StudyRecords from "@/pages/studyRecords";
import { userEvent } from "@testing-library/user-event";

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

  test("学習記録が登録できること＆モーダルが新規登録というタイトル", async () => {
    getAllMock.mockResolvedValue([]);

    // 登録が成功した時にAPIから帰ってくることを想定したオブジェクトを用意
    createMock.mockResolvedValue({
      id: 99,
      title: "moritaka",
      time: 2,
      created_at: "2026-02-05T00:00:00Z",
    });

    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);

    // 初期ロード完了待ち
    await waitFor(() => expect(getAllMock).toHaveBeenCalledTimes(1));

    // 新規登録
    await userEvent.click(screen.getByRole("button", { name: "新規登録" }));
    // ダイアログの取得
    const dialog = await screen.findByRole("dialog");
    // モーダルのタイトル確認
    expect(within(dialog).getByText("新規登録")).toBeInTheDocument();

    // フォーム入力
    await userEvent.type(within(dialog).getByLabelText("学習内容"), "moritaka");
    const timeInput = within(dialog).getByLabelText("学習時間");
    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, "2");

    // 登録
    await userEvent.click(within(dialog).getByRole("button", { name: "登録" }));

    // createが呼ばれたこと(timeはnumberになる)
    await waitFor(() => {
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith({ title: "moritaka", time: 2 });
    });

    expect(await screen.findByText("moritaka")).toBeInTheDocument();
  });

  test("学習内容がないときに登録するとエラーがでる", async () => {
    getAllMock.mockResolvedValue([]);
    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);
    await waitFor(() => expect(getAllMock).toHaveBeenCalledTimes(1));
    await userEvent.click(screen.getByRole("button", { name: "新規登録" }));
    const dialog = await screen.findByRole("dialog");
    const timeInput = within(dialog).getByLabelText("学習時間");
    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, "2");
    await userEvent.click(within(dialog).getByRole("button", { name: "登録" }));
    expect(
      await within(dialog).findByText("学習内容の入力は必須です。"),
    ).toBeInTheDocument();
    // createは呼ばれない
    expect(createMock).not.toHaveBeenCalled();
  });

  test("学習時間がないときに登録するとエラーがでる", async () => {
    getAllMock.mockResolvedValue([]);
    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);
    await waitFor(() => expect(getAllMock).toHaveBeenCalledTimes(1));
    await userEvent.click(screen.getByRole("button", { name: "新規登録" }));
    const dialog = await screen.findByRole("dialog");
    await userEvent.type(within(dialog).getByLabelText("学習内容"), "moritaka");
    await userEvent.click(within(dialog).getByRole("button", { name: "登録" }));
    expect(
      await within(dialog).findByText("学習時間の入力は必須です。"),
    ).toBeInTheDocument();
    // createは呼ばれない
    expect(createMock).not.toHaveBeenCalled();
  });

  test("0より大きい数値でないときのエラー（min: 0.01）", async () => {
    getAllMock.mockResolvedValue([]);
    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);
    await waitFor(() => expect(getAllMock).toHaveBeenCalledTimes(1));
    await userEvent.click(screen.getByRole("button", { name: "新規登録" }));
    const dialog = await screen.findByRole("dialog");
    await userEvent.type(within(dialog).getByLabelText("学習内容"), "moritaka");
    const timeInput = within(dialog).getByLabelText("学習時間");
    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, "0"); // min違反
    await userEvent.click(within(dialog).getByRole("button", { name: "登録" }));
    expect(
      await within(dialog).findByText("0より大きい数値を入力してください。"),
    ).toBeInTheDocument();
    expect(createMock).not.toHaveBeenCalled();
  });

  test("学習記録が編集できること", async () => {
    getAllMock.mockResolvedValueOnce(mockStudyRecords);
    const target = mockStudyRecords[0];

    // update成功
    updateMock.mockResolvedValueOnce({
      ...target,
      title: "moritaka updated",
      time: 3,
    });

    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);
    // target行を特定
    const titleCell = await screen.findByText(target.title);
    const row = titleCell.closest("tr");
    if (!row) throw new Error("row(tr)が見つかりません");

    // 行内の「編集」ボタンをクリック
    await userEvent.click(within(row).getByLabelText("編集"));
    // 編集モーダル
    const dialog = await screen.findByRole("dialog");
    // モーダルのタイトルが「記録編集」になっている
    expect(within(dialog).getByText("記録編集")).toBeInTheDocument();
    // モーダルのボタンが「更新」になっている
    expect(
      within(dialog).getByRole("button", { name: "更新" }),
    ).toBeInTheDocument();

    // 初期値をとる
    const titleInput = within(dialog).getByLabelText("学習内容");
    expect(titleInput).toHaveValue(target.title);

    const timeInput = within(dialog).getByLabelText("学習時間");
    expect(timeInput).toHaveValue(target.time);

    // 値を変更
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "moritaka updated");

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, "3");
    // 「更新」ボタンをクリック
    await userEvent.click(within(dialog).getByRole("button", { name: "更新" }));

    // updateが正しい引数で呼ばれた（target.idを含む形）
    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith({
        id: target.id,
        title: "moritaka updated",
        time: 3,
      });
    });

    // 一覧に反映（旧タイトルが消えて新タイトルが出る想定）
    await waitFor(() => {
      // queryByText:存在しないことを確認するための専用API
      expect(screen.queryByText(target.title)).not.toBeInTheDocument();
    });
    expect(await screen.findByText("moritaka updated")).toBeInTheDocument();
  });

  test("学習記録が削除できること", async () => {
    getAllMock.mockResolvedValueOnce(mockStudyRecords);

    // delete APIが成功したことにする設定
    deleteMock.mockResolvedValueOnce(undefined);

    renderWithProviders(<StudyRecords />, PATHS.STUDY_RECORDS);

    const target = mockStudyRecords[0];
    expect(await screen.findByText(target.title)).toBeInTheDocument();

    // 削除するボタン（行）を特定
    const titleCell = await screen.findByText(target.title);
    const row = titleCell.closest("tr");
    if (!row) throw new Error("row(tr)が見つかりません");

    await userEvent.click(within(row).getByLabelText("削除"));
    const dialog = await screen.findByRole("alertdialog");
    expect(within(dialog).getByText("削除確認")).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "削除" }));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(deleteMock).toHaveBeenCalledWith(target.id);
    });

    await waitFor(() => {
      expect(screen.queryByText(target.title)).not.toBeInTheDocument();
    });
  });
});
