export type SubjectType = {
  subject_id: string;
  subject_name: string;
  subject_field: string;
  subject_year: string;
  subject_password: string;
};

export type SubjectTypeQuery = {
  subjectName: string;
  subjectField: string;
  subjectYear: string;
  password: string;
};
