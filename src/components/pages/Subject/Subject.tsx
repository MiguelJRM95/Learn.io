import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { v4 } from 'uuid';
import { routes } from '../../../utils/routes';
import AdminActionButton from '../../AdminActionButton/AdminActionButton';
import { createNewSection, fetchSubjectSections } from './api';
import Section from './Section/Section';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userProfile: any;
};

export const Subject = ({ userProfile }: Props) => {
  const [showAddSectionForm, setShowAddSectionForm] = useState(false);
  const [sectionName, setSectionName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sections, setSections] = useState<any[]>([]);
  const profile = userProfile.profile[0];
  const router = useRouter();
  const alert = useAlert();
  const { sid } = router.query;

  const onCreate = async (sectionName: string, sid: string | string[] | undefined) => {
    const { data, error } = await createNewSection(sectionName, sid);
    if (data) {
      setShowAddSectionForm(false);
      setSectionName('');
      getSubjectSections(sid);
      return alert.success('New section created');
    }
    if (error) console.log(error);
  };

  const getSubjectSections = async (sid: string | string[] | undefined) => {
    const { data, error } = await fetchSubjectSections(sid);
    if (data) setSections(data);
    if (error) console.log(error);
  };

  useEffect(() => {
    getSubjectSections(sid);
  }, [sid]);

  return (
    <>
      <div className="flex w-full flex-wrap">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-6 md:-mb-6 md:justify-start md:pl-8">
            <a
              href={routes.home}
              className="bg-black hover:bg-gray-600 p-4 text-xl font-extrabold text-white"
            >
              <span className="mr-2">🡠</span> Go Back to Learn.io
            </a>
          </div>
        </div>
      </div>
      <div className="w-screen mt-5 flex-col items-center justify-center">
        <div>
          {profile.role === 'TEACHER' ? (
            <div className="m-5 flex gap-5 flex-col md:flex-row items-center justify-center">
              <AdminActionButton
                onClick={() => {
                  setShowAddSectionForm(!showAddSectionForm);
                }}
                label="Create Section"
                description="Let's create a new section!"
              />
            </div>
          ) : null}
        </div>
        <div className="w-screen mt-5 flex-col items-center justify-center">
          {showAddSectionForm ? (
            <div className="flex flex-col items-center justify-center flex-wrap gap-5  mt-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onCreate(sectionName, sid);
                }}
              >
                <div className="relative">
                  <input
                    type="search"
                    id="default-search"
                    value={sectionName}
                    onInput={(e) => {
                      setSectionName((e.target as HTMLInputElement).value);
                    }}
                    className="p-4 xl:w-96 sm:w-52 md:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                    placeholder="Section name..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="w-screen mt-5 flex-col items-center justify-center">
          {sections
            ? sections.map((section) => {
                return <Section key={v4()} section={section} role={profile.role} />;
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Subject;
