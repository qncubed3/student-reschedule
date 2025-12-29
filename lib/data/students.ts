import { createClient } from "../supabase/server";

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

export async function getEnrolledSubjects() {
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
                tutors (
                    first_name,
                    last_name,
                    email,
                    phone
                ),
                subjects (
                    code,
                    name
                )
            )
        `)
    
    if (error) {
        console.error("Error: ", error.message)
    }

    return data

}