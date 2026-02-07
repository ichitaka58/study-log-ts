export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            new_study_records: {
                Row: {
                    id: number
                    title: string
                    time: number
                    created_at: string
                    updated_at: string | null
                }
                Insert: {
                    id?: number
                    title: string
                    time: number
                    created_at?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: number
                    title?: string
                    time?: number
                    created_at?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
