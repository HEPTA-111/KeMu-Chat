import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  content: string;
}

const AboutCard = ({ icon, title, content }: Props) => {
  return (
    <>
      <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-primary/10">
        {icon}

        <h2 className="mt-4 text-xl font-bold text-black">{title}</h2>

        <p className="mt-1 text-sm text-gray-900">{content}</p>
      </div>
    </>
  );
};

export default AboutCard;
