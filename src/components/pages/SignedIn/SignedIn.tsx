import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ProfileData } from '../../../hooks/database/users';

import { SubjectType } from '../../../types/subjectType';
import { routes } from '../../../utils/routes';
import AuthLoadingScreen from '../../AuthLoadingScreen/AuthLoadingScreen';
import { Navbar } from '../../layout/navbar/Navbar';
import SubjectCard from '../../SubjectCard/SubjectCard';
import { fetchUserProfile, fetchUserSubjets } from './api';

type Props = {
  uuid: string;
};

export const SignedIn = ({ uuid }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const [emptySubjects, setEmptySubjects] = useState(false);
  const [profile, setProfile] = useState<ProfileData>();

  const getUserSubjects = async (user_id: string) => {
    const { data, error } = await fetchUserSubjets(user_id);
    if (data) {
      if (data.length > 0) {
        setSubjects(data);
      } else {
        setEmptySubjects(true);
      }
      setIsLoading(false);
    }
    if (error) console.log(error);
  };

  const getUserProfile = async (user_id: string) => {
    const { data, error } = await fetchUserProfile(user_id);
    if (data) {
      if (data[0]) setProfile(data[0]);
    }
    if (error) console.log(error);
  };

  useEffect(() => {
    getUserSubjects(uuid);
    getUserProfile(uuid);
  }, [uuid]);

  return (
    <>
      <Navbar userProfile={profile} />
      <div className="flex flex-col items-center mt-5 w-screen h-3/4">
        <h1 className="flex font-semibold  text-3xl">
          Hello <span className="animate-waving-hand"> 👋🏻 </span>, {profile?.first_name}{' '}
          {profile?.last_name}
        </h1>
        {isLoading ? <AuthLoadingScreen /> : null}
        {emptySubjects ? (
          <Link href={routes.find}>
            <p className="text-xl mt-5 cursor-pointer text-cyan-500 transition hover:font-bold hover:underline">
              Enroll into a subject!
            </p>
          </Link>
        ) : null}
        <div className="w-screen flex justify-center gap-4 my-4">
          {subjects
            ? subjects.map((subject) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { subject: realSubject }: any = subject;
                return (
                  <>
                    <SubjectCard
                      key={realSubject.subject_id}
                      subject={realSubject}
                      uuid={uuid}
                      isFindPage={false}
                    />
                  </>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default SignedIn;
