"use server"

import { createClient } from "../supabase/server";
import { ClassDetails, WeekDetails } from "@/types/enrolment";

const CURRENT_ACADEMIC_YEAR_ID = 1;


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
                id,
                name,
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
                    name,
                    color
                ),
                room: rooms (
                    id,
                    capacity,
                    room_number,
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
            id,
            name,
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
                name,
                color
            ),
            room: rooms (
                id,
                capacity,
                room_number,
                campus: campuses (
                    id,
                    name
                )
            )    
        `)
        .eq("subject_id", subjectId);

    if (error) {
        console.error("Error fetching subject availabilities: ", error);
        return [];
    }

    return data as ClassDetails[] ?? [];
}

export async function getWeekData(): Promise<WeekDetails[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("academic_weeks")
        .select(`
            *,
            academic_year: academic_years (
                *
            )
            `)
        .eq("academic_year_id", CURRENT_ACADEMIC_YEAR_ID)
    
    if (error) {
        console.error("Error fetching week data: ", error)
        return []
    }
    console.log(JSON.stringify(data, null, 4))
    console.log("bruhhhh")
    return data as WeekDetails[] ?? []
}