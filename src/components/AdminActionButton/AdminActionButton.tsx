import React from 'react';

type Props = {
  label: string;
  description: string;
};

const AdminActionButton = ({ label, description }: Props) => {
  return (
    <button className="max-w-xs rounded  transition shadow-md shadow-slate-800 hover:bg-cyan-100 hover:scale-110">
      <div className="p-4">
        <div>
          <h2 className="text-xl font-bold ">{label}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default AdminActionButton;
