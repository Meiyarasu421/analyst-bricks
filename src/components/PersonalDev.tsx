import React from 'react';
import { Languages, MessageCircle, Presentation, Users, Lightbulb, ExternalLink } from 'lucide-react';
import { SoftSkill } from '../types';

const SKILLS: SoftSkill[] = [
  {
    id: 'english',
    title: 'Fluent English Communication',
    description: 'Mastering the art of explaining complex data insights in simple, professional English.',
    tips: [
      'Practice explaining your projects out loud daily.',
      'Learn data-specific vocabulary (e.g., "correlation", "outlier", "trend").',
      'Use tools like Grammarly or Hemingway for written reports.',
      'Watch data analysis tutorials in English to pick up industry jargon.'
    ],
    resources: [
      { label: 'Business English for Data', url: '#' },
      { label: 'Public Speaking Tips', url: '#' }
    ]
  },
  {
    id: 'presentation',
    title: 'Data Storytelling',
    description: 'Turning numbers into compelling narratives that drive business decisions.',
    tips: [
      'Know your audience (Technical vs. Executive).',
      'Focus on the "So What?" - why does this data matter?',
      'Keep slides clean and highlight the key takeaway.',
      'Practice the "Elevator Pitch" for your findings.'
    ],
    resources: [
      { label: 'Storytelling with Data', url: '#' }
    ]
  }
];

export const PersonalDev: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILLS.map(skill => (
          <div key={skill.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center">
                {skill.id === 'english' ? <Languages size={20} /> : <Presentation size={20} />}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{skill.title}</h3>
            </div>
            
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {skill.description}
            </p>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb size={14} className="text-amber-500" /> Key Tips
              </h4>
              <ul className="space-y-2">
                {skill.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-slate-700 flex gap-2">
                    <span className="text-brand-500 font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {skill.resources.map((res, i) => (
                <a 
                  key={i} 
                  href={res.url} 
                  className="text-xs font-semibold text-brand-600 flex items-center gap-1 hover:underline"
                >
                  {res.label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Need a Mock Interview?</h2>
          <p className="text-slate-400 mb-6 max-w-md">Practice your English communication and technical explanations with our AI Assistant.</p>
          <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 rounded-xl font-bold transition-all flex items-center gap-2">
            Start Practice Session <MessageCircle size={18} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
      </div>
    </div>
  );
};
