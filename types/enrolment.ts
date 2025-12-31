import type { Tables } from "./supabase";

export type EnrolledSubject = Tables<"enrolments"> & {
    classes: Tables<"classes"> & {
        tutors: Tables<"tutors"> | null;
        subjects: Tables<"subjects"> | null;
    } | null;
};