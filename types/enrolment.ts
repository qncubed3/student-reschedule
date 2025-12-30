export interface Subject {
  code: string;
  name: string;
}

export interface Tutor {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Class {
  name: string;
  room_id: string;
  class_number: number;
  class_type: string;
  day_of_week: string;
  start_time: string; 
  end_time: string;
  tutors: Tutor[];
  subjects: Subject[];
}

export interface Enrolment {
    classes: Class[];
}

export interface SubjectEnrolledCardProps {
    enrolment: Enrolment;
    selected?: boolean;
    onClick?: () => void;
}

export interface StudentEnrolmentsClientProps {
    enrolments: Enrolment[]
}