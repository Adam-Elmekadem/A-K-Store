import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function TeamCard({ name, role, github, linkedin }) {
  return (
    <div className=" p-8 flex flex-col items-center">
      <div className="w-20 h-20 flex items-center justify-center mb-4 red-AKred text-3xl font-bold font-Guardian">
        {name[0]}
      </div>
      <h4 className="text-xl font-bold mb-1 text-white">{name}</h4>
      <p className="text-md text-gray-400 font-poppins mb-4">{role}</p>
      <div className="flex gap-4">
        <a href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Linkedin size={28} className="red-AKred hover:text-white transition" />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github size={28} className="red-AKred hover:text-white transition" />
        </a>
      </div>
    </div>
  );
}