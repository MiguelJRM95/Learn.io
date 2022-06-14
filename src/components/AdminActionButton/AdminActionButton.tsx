import React from 'react';

type Props = {
  label: string;
  description: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AdminActionButton = ({ label, description, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="max-w-xs rounded  transition shadow-md shadow-slate-800 hover:bg-cyan-100 hover:scale-110"
    >
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
