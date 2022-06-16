import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { SubjectType } from '../../types/subjectType';
import { getProfilesImages } from './api';
import dummyPic from '../../assets/images/default-profile.png';
import { AvatarUrlType } from '../../types/avatarUrlType';
import PaswordModal from './PasswordModal/PaswordModal';

type Props = {
  subject: SubjectType;
  uuid: string;
};

const SubjectCard = ({ subject, uuid }: Props) => {
  const [profileImages, setProfileImages] = useState<Array<AvatarUrlType>>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfileImages = async (subject_id: string) => {
    const { data, error } = await getProfilesImages(subject_id);
    if (data) {
      setProfileImages(data);
    }
    if (error) console.log(error);
  };

  useEffect(() => {
    fetchProfileImages(subject.subject_id);
  }, [subject.subject_id]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-40">
        <div className="flex justify-between items-baseline relative">
          <h3 className="text-blue-300 mb-4 text-sm font-bold">{subject.subject_field}</h3>
          <button
            onClick={() => {
              setShowPasswordModal(!showPasswordModal);

              //enrollStudentIntoASubject(subject.subject_id, uuid);
            }}
            className="bg-black text-lg font-bold text-white hover:bg-gray-700 absolute -top-1 -right-9 transform -translate-y-1/2 w-10 h-10 border-2 border-white dark:border-gray-800 rounded-full text-center"
          >
            +
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{subject.subject_name}</h2>
        <div className="flex justify-between items-baseline">
          <p className="text-gray-700">{subject.subject_year}</p>
          <div className="flex -space-x-4">
            {profileImages
              ? profileImages.map((profileImage) => {
                  return (
                    <>
                      <div key={v4()} className="w-10 h-10 relative">
                        <Image
                          key={v4()}
                          className="border-2 border-white rounded-full dark:border-gray-800"
                          src={
                            profileImage.avatar_url !== undefined
                              ? `/uploads/${profileImage.avatar_url}`
                              : dummyPic
                          }
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {showPasswordModal ? (
        <PaswordModal
          onClose={() => {
            setShowPasswordModal(false);
          }}
          subject_id={subject.subject_id}
          uuid={uuid}
        />
      ) : null}
    </>
  );
};

export default SubjectCard;
