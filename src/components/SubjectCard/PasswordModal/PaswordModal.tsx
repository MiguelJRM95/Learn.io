import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { checkSubjectPassword, enrollIntoASubject } from '../api';

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  subject_id: string;
  uuid: string;
};

const PaswordModal = ({ onClose, subject_id, uuid }: Props) => {
  const alert = useAlert();
  const [inputSubjectPassword, setInputSubjectPassword] = useState('');
  const onEnroll = async (subject_id: string, subject_password: string, uuid: string) => {
    const { data, error } = await checkSubjectPassword(subject_id, subject_password);
    if (data) {
      if (data.length > 0) {
        const { data: userEnrolled, error: userNotEnrolled } = await enrollIntoASubject(
          subject_id,
          uuid
        );

        if (userEnrolled) return alert.success(`You are now enrolled on ${data[0].subject_name}`);
        if (userNotEnrolled) return alert.error('Something went wrong');
      }
      return alert.error('Wrong password');
    }
    if (error) return alert.error('Something went wrong');
  };

  return (
    <>
      <div className="absolute w-screen h-screen flex flex-col items-center justify-center z-50 ">
        <div
          className="modal fade fixed top-24 pt-5 left-50 w-screen h-screen outline-none overflow-x-hidden overflow-y-auto border-2 bg-gray-700/60 flex justify-center"
          tabIndex={-1}
        >
          <div className="modal-dialog relative w-2/6 pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-3xl font-bold text-gray-900 ">Top left modal</h5>
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body relative p-4 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold text-gray-600">Type the subject password</h3>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setInputSubjectPassword(e.target.value);
                  }}
                  className="my-5 focus:shadow-outline w-3/5 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200">
                <button
                  type="button"
                  className="mt-5 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700 text-center transition duration-150 ease-in-out rounded-md"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-5 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700 text-center transition duration-150 ease-in-out ml-1 rounded-md"
                  onClick={() => {
                    onEnroll(subject_id, inputSubjectPassword, uuid);
                  }}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaswordModal;
