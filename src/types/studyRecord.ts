export type StudyRecord = {
  id: number;
  title: string;
  time: number;
  created_at: string;
  updated_at: string | null;
};

// 新規登録用の型
export type StudyRecordInsert = Omit<StudyRecord, "id" | "created_at" | "updated_at">;

// フォーム入力用の型
export type StudyRecordFormValues = StudyRecordInsert;

// データ更新用の型
export type StudyRecordUpdate = Pick<StudyRecord, "id" | "title" | "time">;