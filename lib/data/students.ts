"use server"

import { createClient } from "../supabase/server";
import { ClassDetails } from "@/types/enrolment";


export async function getStudentEnrolments() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("enrolments")
        .select(`
            *,
            students (
                id,
                first_name,
                last_name,
                email
            )
        `)

    if (error) {
        console.error("Error: ", error.message)
    }

    return data
}

export async function getEnrolledClasses(): Promise<ClassDetails[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("enrolments")
        .select(`
            classes (
                name,
                room_id,
                class_number,
                class_type,
                day_of_week,
                start_time,
                end_time,
                tutor: tutors (
                    first_name,
                    last_name,
                    email,
                    phone
                ),
                subject: subjects (
                    id,
                    code,
                    name
                ),
                room: rooms (
                    id,
                    capacity,
                    campus: campuses (
                        id,
                        name
                    )
                )    
            )
        `)
    
    if (error) {
        console.error("Error: ", error.message)
        return []
    }

    return data.map((enrolment) => (enrolment.classes)) as ClassDetails[];
}

export async function getSubjectClasses(subjectId: number): Promise<ClassDetails[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("classes")
        .select(`
            name,
            room_id,
            class_number,
            class_type,
            day_of_week,
            start_time,
            end_time,
            tutor: tutors (
                first_name,
                last_name,
                email,
                phone
            ),
            subject: subjects (
                id,
                code,
                name
            ),
            room: rooms (
                id,
                capacity,
                campus: campuses (
                    id,
                    name
                )
            )    
        `)
        .eq("subject_id", subjectId);

    if (error) {
        console.error("Error fetching subject availabilities:", error);
        return [];
    }

    return data as ClassDetails[] ?? [];
}
