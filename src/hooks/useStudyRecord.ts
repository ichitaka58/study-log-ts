import { StudyRecordApi } from "@/api/studyRecordApi"
import type { StudyRecord } from "@/types/studyRecord";
import { useEffect, useState } from "react";

const studyRecordApi = new StudyRecordApi();

export const useStudyRecord = () => {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getStudyRecords = async () => {
    setLoading(true);
    try {
      const records = await studyRecordApi.getAll();
      setStudyRecords(records);
    }catch(error){
      console.error("データの取得失敗:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStudyRecords();
  }, []);

  return { studyRecords, loading };
}