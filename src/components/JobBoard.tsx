import React from 'react';
import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Job } from '../types';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Junior Data Analyst',
    company: 'TechFlow Solutions',
    location: 'Remote / New York',
    type: 'Full-time',
    postedAt: '2 days ago',
    description: 'Looking for a junior analyst proficient in SQL and Tableau to help our marketing team.'
  },
  {
    id: '2',
    title: 'Data Analyst Intern',
    company: 'Global Insights Corp',
    location: 'Chicago, IL',
    type: 'Internship',
    postedAt: '5 hours ago',
    description: 'Summer internship focused on data cleaning and exploratory data analysis using Python.'
  },
  {
    id: '3',
    title: 'Business Intelligence Analyst',
    company: 'FinEdge Systems',
    location: 'Remote',
    type: 'Full-time',
    postedAt: '1 week ago',
    description: 'Help us build automated dashboards and reports for our financial services clients.'
  }
];

export const JobBoard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-800">Recent Opportunities</h2>
        <button className="text-sm text-brand-600 font-medium hover:underline">View All</button>
      </div>
      
      <div className="grid gap-4">
        {MOCK_JOBS.map(job => (
          <div key={job.id} className="p-4 bg-white rounded-xl border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                <p className="text-sm text-slate-600 font-medium">{job.company}</p>
              </div>
              <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-bold uppercase">
                {job.type}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
              <div className="flex items-center gap-1">
                <MapPin size={12} /> {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} /> {job.postedAt}
              </div>
            </div>
            
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">
              {job.description}
            </p>
            
            <button className="w-full py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-600 hover:text-white transition-all">
              Apply Now <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
