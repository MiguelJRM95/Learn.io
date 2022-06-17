import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { v4 } from 'uuid';
import { uploadResourceRequest } from '../../../../services/resource/resource';
import { UiFileInputButton } from '../../../UIFileInputButton/UiFileInputButton';
import { addResource, fetchResources } from '../Resource/api';
import Resource from '../Resource/Resource';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  section: any;
  role: string;
};

export const Section = ({ section, role }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resources, setResources] = useState<any[]>([]);
  const alert = useAlert();

  const onAddResource = async (section_id: string, formData: FormData) => {
    formData.append('section_id', section_id);
    const response = await uploadResourceRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });
    const { error, data } = response;
    if (error) console.log(error);
    if (data) {
      const name = data[0].split('.')[0];
      const resource_url = `/uploads/resources/${data[0]}`;
      const resource_extension = data[0].split('.')[1];
      const { data: supabaseData, error } = await addResource(
        name,
        resource_url,
        resource_extension,
        section.section_id
      );
      if (supabaseData) {
        getResources(section.section_id);
        return alert.success('Resource succesfully added');
      }
      if (error) {
        return alert.success('Something went wrong, try later');
      }
    }
  };

  const getResources = async (section_id: string) => {
    const { data, error } = await fetchResources(section_id);
    if (data) setResources(data);
    if (error) console.log(error);
  };

  useEffect(() => {
    getResources(section.section_id);
  }, [section.section_id]);

  return (
    <div className="py-5 w-screen flex flex-col items-center justify-center">
      <div className="w-3/4 border-b border-gray-200 flex justify-between">
        <p className="text-2xl font-bold text-blue-300">{section.name}</p>
        {role === 'TEACHER' ? (
          <UiFileInputButton
            label="+"
            uploadFileName="theFiles"
            onChange={(formData) => {
              onAddResource(section.section_id, formData);
            }}
            className="bg-black text-lg font-bold text-white hover:bg-gray-700  w-10 h-10 border-2 border-white dark:border-gray-800 rounded-xl text-center"
          />
        ) : null}
      </div>
      <div className="w-3/4 px-10 py-5">
        {resources
          ? resources.map((resource) => {
              return <Resource key={v4()} resource={resource} role={role} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Section;
