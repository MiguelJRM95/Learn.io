/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useProfile } from '../../../hooks/database/users';
import AdminActionButton from '../../AdminActionButton/AdminActionButton';
import { Navbar } from '../../layout/navbar/Navbar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Admin = ({ userProfile }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [{ data: profilesData }] = useProfile();
  const adminProfile = userProfile.profile[0];
  return (
    <>
      <Navbar userProfile={adminProfile} />
      <div className="m-10 flex items-center justify-center">
        <div className="m-5 flex gap-5">
          <AdminActionButton label="Create Subject" description="Let's create a new subject!" />
          <AdminActionButton
            label="Create Teacher Account"
            description="Join a new teacher to the team!"
          />
          <AdminActionButton label="Students" description="See all the students in the platform!" />
        </div>
      </div>
    </>
  );
};

export default Admin;
