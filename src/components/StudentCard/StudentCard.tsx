import Image from 'next/image';
import React from 'react';
import { ProfileData } from '../../hooks/database/users';
import dummyPic from '../../assets/images/default-profile.png';
import { acceptStudent } from './api';
import { useAlert } from 'react-alert';

type Props = {
  studentProfile: ProfileData;
};

const StudentCard = ({ studentProfile }: Props) => {
  const alert = useAlert();

  const updateRequestStudent = async () => {
    const { data, error } = await acceptStudent(studentProfile.email);
    if (data) {
      return alert.success(`The student with email ${studentProfile.email} has been accepted`);
    }
    if (error) {
      return alert.error('Somthing went wrong accepting the student');
    }
  };

  return (
    <div className="max-w-sm px-5 pt-5  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <Image
          className="mb-3 rounded-full shadow-lg"
          src={studentProfile.avatar_url ? `/uploads/${studentProfile.avatar_url}` : dummyPic}
          alt="Bonnie image"
          height={100}
          width={100}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {studentProfile.first_name} {studentProfile.last_name}
        </h5>
        <span className="mb-1 text-base font-medium text-gray-900 dark:text-white">
          {studentProfile.email}
        </span>
        <span
          className={`text-sm text-gray-500 dark:text-gray-400 ${
            studentProfile.is_accepted
              ? 'text-green-500 dark:text-green-400'
              : 'text-rose-500 dark:text-rose-400'
          }`}
        >
          {studentProfile.is_accepted ? 'ACCEPTED' : 'NOT ACCEPTED'}
        </span>
        <div className="flex mt-4 space-x-3 lg:mt-6">
          <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Delete
          </button>
          <button
            onClick={updateRequestStudent}
            disabled={studentProfile.is_accepted ? true : false}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 disabled:opacity-30"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
