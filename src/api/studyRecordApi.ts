import { supabase } from "@/lib/supabaseClient";
import type { StudyRecord, StudyRecordInsert } from "@/types/studyRecord";


export class StudyRecordApi {

  
  async getAll(): Promise<StudyRecord[]> {
    const { data, error } = await supabase
      .from("new_study_records")
      .select("*")
      .order("created_at", { ascending: true });
      if(error) throw error;
      return data as StudyRecord[];
  }

  async create(record: StudyRecordInsert):Promise<StudyRecord> {
    const { data, error } = await supabase
      .from("new_study_records")
      .insert(record)
      .select()
      .single();
    if(error) throw error;
    return data as StudyRecord;
  } 


}