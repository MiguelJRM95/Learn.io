import { User } from '@supabase/supabase-auth-helpers/nextjs';
import React, { useState } from 'react';
import { ProfileData } from '../../../hooks/database/users';
import { SubjectType } from '../../../types/subjectType';
import { Navbar } from '../../layout/navbar/Navbar';
import SubjectCard from '../../SubjectCard/SubjectCard';

export type FindProps = {
  subjects: Array<SubjectType>;
  profile: ProfileData[];
  user: User;
};

export const Find = ({ subjects, profile, user }: FindProps) => {
  const [filterCourse, setFilterCourse] = useState('');
  const filterByName = (subjects: SubjectType[]) => {
    if (filterCourse === '') {
      return subjects;
    }

    return subjects.filter((subject) => {
      return subject.subject_name.toLowerCase().includes(filterCourse.toLowerCase());
    });
  };

  return (
    <>
      <Navbar userProfile={profile[0]} />
      <div className="flex flex-col items-center mt-5">
        <div className="my-auto flex flex-col justify-center px-8 pt-8 sm:justify-center md:justify-center md:px-24 md:pt-0 lg:px-32">
          <p className="text-center text-3xl font-semibold">Find your subjects and enroll!</p>
          <div className="flex flex-col items-center justify-center flex-wrap gap-5 w-fit mt-5">
            <form>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  onChange={(e) => {
                    setFilterCourse(e.target.value);
                  }}
                  className="p-4 pl-10 xl:w-96 sm:w-52 md:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="Search Student By Email..."
                  required
                />
              </div>
            </form>
            <div className="flex items-center justify-center flex-wrap gap-5 w-fit">
              {filterCourse !== ''
                ? filterByName(subjects).map((subject: SubjectType) => {
                    return (
                      <SubjectCard key={subject.subject_id} subject={subject} uuid={user.id} />
                    );
                  })
                : subjects.map((subject: SubjectType) => {
                    return (
                      <SubjectCard key={subject.subject_id} subject={subject} uuid={user.id} />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Find;
