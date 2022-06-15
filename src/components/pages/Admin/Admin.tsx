/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { ProfileData, useProfile } from '../../../hooks/database/users';
import AdminActionButton from '../../AdminActionButton/AdminActionButton';
import CreateTeacherForm from '../../CreateTeacherForm/CreateTeacherForm';
import { Navbar } from '../../layout/navbar/Navbar';
import StudentCard from '../../StudentCard/StudentCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Admin = ({ userProfile }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [{ data: profilesData }] = useProfile();
  const adminProfile = userProfile.profile[0];
  const [showStudents, setShowStudents] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showCreateSubjectForm, setShowCreateSubjectForm] = useState(false);
  const [filterStudent, setFilterStudents] = useState('');

  const filterByName = (
    profilesData: ProfileData[] | null | undefined
  ): ProfileData[] | null | undefined => {
    // Avoid filter for null value
    if (filterStudent === '') {
      return profilesData;
    }

    return profilesData?.filter((student) => {
      if (student.email) {
        return student.email.toLowerCase().includes(filterStudent.toLowerCase());
      }
    });
  };

  return (
    <>
      <Navbar userProfile={adminProfile} />
      <div className="m-10 flex flex-col items-center justify-center">
        <div className="m-5 flex gap-5 flex-col md:flex-row">
          <AdminActionButton
            onClick={() => {
              setShowStudents(false);
              setShowTeacherForm(false);
              setShowCreateSubjectForm(!showCreateSubjectForm);
            }}
            label="Create Subject"
            description="Let's create a new subject!"
          />
          <AdminActionButton
            onClick={() => {
              setShowCreateSubjectForm(false);
              setShowStudents(false);
              setShowTeacherForm(!showTeacherForm);
            }}
            label="Create Teacher Account"
            description="Join a new teacher to the team!"
          />
          <AdminActionButton
            onClick={() => {
              setShowCreateSubjectForm(false);
              setShowTeacherForm(false);
              setShowStudents(!showStudents);
            }}
            label="Students"
            description="See all the students in the platform!"
          />
        </div>
        <div className="flex items-center justify-center flex-wrap gap-5 w-fit">
          {showStudents ? (
            <>
              <div className="flex flex-col items-center justify-center flex-wrap gap-5 w-fit">
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
                        setFilterStudents(e.target.value);
                      }}
                      className="p-4 pl-10 xl:w-96 sm:w-52 md:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                      placeholder="Search Student By Email..."
                      required
                    />
                  </div>
                </form>
                <div className="flex items-center justify-center flex-wrap gap-5 w-fit">
                  {filterStudent !== ''
                    ? filterByName(profilesData)?.map((profile) => {
                        if (profile.role === 'STUDENT') {
                          return <StudentCard key={profile.user_id} studentProfile={profile} />;
                        }
                      })
                    : profilesData?.map((profile) => {
                        if (profile.role === 'STUDENT') {
                          return <StudentCard key={profile.user_id} studentProfile={profile} />;
                        }
                      })}
                </div>
              </div>
            </>
          ) : null}
          {showTeacherForm ? <CreateTeacherForm /> : null}
          {showCreateSubjectForm ? 'FORM' : null}
        </div>
      </div>
    </>
  );
};

export default Admin;
