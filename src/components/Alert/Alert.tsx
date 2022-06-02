import React from 'react';
import { AlertTemplateProps } from 'react-alert';

/* 
    Custom  alert template used with react-alert.
    React alert can also send more props like 'style' and 'close' if needed.

    Refer to https://github.com/schiehll/react-alert#using-a-custom-alert-template
    for more information

    options parameters was an object for style
    export const Alert = ({ options, message }: AlertTemplateProps) => <p>{message}</p>;
*/

export const Alert = ({ message }: AlertTemplateProps) => <p>{message}</p>;
