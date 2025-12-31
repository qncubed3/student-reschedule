import type { Tables } from "./supabase";

export type ClassDetails = Tables<"classes"> & {
    tutor: Tables<"tutors"> | null;
    subject: Tables<"subjects"> | null;
    room: Tables<"rooms"> & {
        campus: Tables<"campuses">  
    } | null;
}