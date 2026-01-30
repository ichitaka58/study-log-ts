export type StudyRecord = {
  id: number;
  title: string;
  time: number;
  createdAt: string;
  updatedAt: string;
};

// 新規登録用の型
export type StudyRecordInsert = Omit<StudyRecord, "id" | "createdAt" | "updatedAt">;

// フォーム入力用の型
export type StudyRecordFormValues = StudyRecordInsert;

// データ更新用の型
export type StudyRecordUpdate = Pick<StudyRecord, "id" | "title" | "time">;