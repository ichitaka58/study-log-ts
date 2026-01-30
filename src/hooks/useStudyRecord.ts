import { StudyRecordApi } from "@/api/studyRecordApi"
import type { StudyRecord, StudyRecordInsert } from "@/types/studyRecord";
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


  const createStudyRecord = async (record: StudyRecordInsert): Promise<void> => {
    try {
      const created = await studyRecordApi.create(record);
      setStudyRecords((prev) => [...prev, created]);
    }catch(error) {
      console.error("データの生成失敗:", error);
    }
  }

  return { studyRecords, loading, createStudyRecord };

}