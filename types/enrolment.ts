import type { Tables } from "./supabase";

export type ClassDetails = Tables<"classes"> & {
    tutor: Tables<"tutors">;
    subject: Tables<"subjects">;
    room: Tables<"rooms"> & {
        campus: Tables<"campuses">  
    } | null;
}

export type WeekDetails = Tables<"academic_weeks"> & {
    academic_year: Tables<"academic_years">;
}