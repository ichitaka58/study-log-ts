import { StudyRecordApi } from "@/api/studyRecordApi";
import type {
  StudyRecord,
  StudyRecordInsert,
  StudyRecordUpdate,
} from "@/types/studyRecord";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToastMessage } from "./useToastMessage";

export const useStudyRecord = () => {

  // トースト表示のカスタムフック
  const { toastSuccess, toastError } = useToastMessage();

  // 毎レンダーnewしないようにuseMemoでメモ化
  const studyRecordApi = useMemo(() => new StudyRecordApi(), []);

  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getStudyRecords = useCallback(async () => {
    setLoading(true);
    try {
      const records = await studyRecordApi.getAll();
      setStudyRecords(records);
    } catch (error) {
      console.error("データの取得失敗:", error);
      toastError("データ取得エラー", "データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [studyRecordApi, toastError]);

  useEffect(() => {
    void getStudyRecords();
  }, [getStudyRecords]);

  const createStudyRecord = useCallback(async (
    record: StudyRecordInsert,
  ): Promise<void> => {
    try {
      const created = await studyRecordApi.create(record);
      setStudyRecords((prev) => [...prev, created]);
      toastSuccess("データ登録成功", "データが登録されました。");
    } catch (error) {
      console.error("データの生成失敗:", error);
      toastError("データ生成エラー", "データの生成に失敗しました。");
    }
  }, [studyRecordApi, toastSuccess, toastError]);

  const updatedStudyRecord = useCallback(async (
    record: StudyRecordUpdate,
  ): Promise<void> => {
    try {
      const updated = await studyRecordApi.update(record);
      setStudyRecords((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      );
      toastSuccess("データの更新", "データを更新しました");
    } catch (error) {
      console.error("データの更新失敗:", error);
      toastError("データ更新エラー", "データが更新できませんでした");
    }
  }, [studyRecordApi, toastSuccess, toastError]);

  const deleteStudyRecord = useCallback(async (id: number): Promise<void> => {
    try {
      await studyRecordApi.delete(id);
      setStudyRecords((prev) => prev.filter((r) => r.id !== id));
      toastSuccess("データの削除", "データを削除しました");
    } catch (error) {
      console.error("データの削除失敗:", error);
      toastError("データ削除エラー", "データが削除できませんでした");
    }
  }, [studyRecordApi, toastSuccess, toastError]);

  return {
    studyRecords,
    loading,
    createStudyRecord,
    deleteStudyRecord,
    updatedStudyRecord,
  };
};
