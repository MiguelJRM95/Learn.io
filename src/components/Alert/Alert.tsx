import React from 'react';
import { AlertTemplateProps } from 'react-alert';

/* 
    Custom  alert template used with react-alert.
    React alert can also send more props like 'style' and 'close' if needed.

    Refer to https://github.com/schiehll/react-alert#using-a-custom-alert-template
    for more information

*/

export const Alert = ({ options, message }: AlertTemplateProps) => (
  <div
    className={`${
      options.type === 'success' ? 'bg-lime-500' : 'bg-red-400'
    } mt-5 flex justify-center space-x-9 rounded-md p-3`}
  >
    <p className="text-xl font-semibold">{message}</p>
  </div>
);
