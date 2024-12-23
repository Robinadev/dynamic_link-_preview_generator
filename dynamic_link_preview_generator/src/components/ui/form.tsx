import React, { ReactNode } from 'react';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

export const Form = ({ children, ...props }: FormProps) => {
  useFormContext();
  return <form {...props}>{children}</form>;
};

type FormControlProps = {
  children: ReactNode;
};

export const FormControl = ({ children }: FormControlProps) => {
  return <div className="form-control">{children}</div>;
};

type FormFieldProps = ControllerProps & {
  render: (props: never) => ReactNode;
};

export const FormField = ({ name, control, render }: FormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={render}
    />
  );
};

type FormItemProps = {
  children: ReactNode;
};

export const FormItem = ({ children }: FormItemProps) => {
  return <div className="form-item">{children}</div>;
};

type FormMessageProps = {
  children: ReactNode;
};

export const FormMessage = ({ children }: FormMessageProps) => {
  return <div className="form-message">{children}</div>;
};