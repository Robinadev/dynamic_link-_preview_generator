import React from 'react';

type PreviewProps = {
  title: string;
  description: string;
  image: string;
};

export const Preview = ({ title, description, image }: PreviewProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={image} alt={title} />
    </div>
  );
};