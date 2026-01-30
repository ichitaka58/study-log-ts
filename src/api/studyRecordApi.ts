import { supabase } from "@/lib/supabaseClient";
import type { StudyRecord, StudyRecordInsert, StudyRecordUpdate } from "@/types/studyRecord";


export class StudyRecordApi {
  
  async getAll(): Promise<StudyRecord[]> {
    const { data, error } = await supabase
      .from("new_study_records")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data as StudyRecord[];
  }

  async create(record: StudyRecordInsert): Promise<StudyRecord> {
    const { data, error } = await supabase
      .from("new_study_records")
      .insert(record)
      .select()
      .single();
    if (error) throw error;
    return data as StudyRecord;
  }

  async update(record: StudyRecordUpdate): Promise<StudyRecord> {
    const { data, error } = await supabase
      .from("new_study_records")
      .update({ title: record.title, time: record.time })
      .eq("id", record.id)
      .select()
      .single();
    if(error) throw error;
    return data as StudyRecord;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from("new_study_records")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
}