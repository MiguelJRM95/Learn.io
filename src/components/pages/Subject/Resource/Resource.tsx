import Link from 'next/link';
import React from 'react';
import { useAlert } from 'react-alert';
import { deleteResource } from './api';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource: any;
  role: string;
};

export const Resource = ({ resource, role }: Props) => {
  const alert = useAlert();

  const onRemove = async (resource_id: string) => {
    const { data, error } = await deleteResource(resource_id);
    if (data) {
      alert.success('Resource removed');
    }
    if (error) {
      alert.error('Something went wrong');
    }
  };

  return (
    <div className="flex justify-between items-baseline border-b pb-2">
      <h3 className="text-xl">{resource.name}</h3>
      <div>
        <Link download href={resource.resource_url} target={'_blank'}>
          <span className="cursor-pointer text-lg hover:underline hover:font-semibold text-cyan-500 transition mr-4">
            Download
          </span>
        </Link>
        {role === 'TEACHER' ? (
          <button
            onClick={() => {
              onRemove(resource.resource_id);
            }}
            className="bg-black text-lg font-bold text-white hover:bg-gray-700 border-2 border-white dark:border-gray-800 rounded-md text-center p-2"
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Resource;
