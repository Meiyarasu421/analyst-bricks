import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { RoadmapStep } from '../types';
import { cn } from '../lib/utils';

const STEPS: RoadmapStep[] = [
  { id: '1', title: 'Excel Mastery', description: 'Pivot tables, VLOOKUP, and basic data cleaning.', status: 'completed', category: 'Tools' },
  { id: '2', title: 'SQL Fundamentals', description: 'SELECT, JOINs, Aggregations, and Subqueries.', status: 'current', category: 'Fundamentals' },
  { id: '3', title: 'Statistics for Data Science', description: 'Probability, Distributions, and Hypothesis Testing.', status: 'pending', category: 'Statistics' },
  { id: '4', title: 'Python for Data Analysis', description: 'Pandas, NumPy, and Matplotlib.', status: 'pending', category: 'Tools' },
  { id: '5', title: 'Data Visualization', description: 'Tableau or Power BI dashboarding.', status: 'pending', category: 'Visualization' },
  { id: '6', title: 'Portfolio Project 1', description: 'End-to-end analysis on a real-world dataset.', status: 'pending', category: 'Portfolio' },
];

export const LearningRoadmap: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Learning Roadmap</h2>
        <span className="text-xs font-medium px-2 py-1 bg-brand-100 text-brand-700 rounded-full">
          16% Complete
        </span>
      </div>
      
      <div className="relative space-y-4">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                step.status === 'completed' ? "bg-brand-500 border-brand-500 text-white" : 
                step.status === 'current' ? "border-brand-500 text-brand-500" : "border-slate-200 text-slate-300"
              )}>
                {step.status === 'completed' ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </div>
              {index !== STEPS.length - 1 && (
                <div className={cn(
                  "w-0.5 h-full my-1",
                  step.status === 'completed' ? "bg-brand-500" : "bg-slate-200"
                )} />
              )}
            </div>
            
            <div className={cn(
              "flex-1 p-4 rounded-xl border transition-all",
              step.status === 'current' ? "bg-brand-50/50 border-brand-200 shadow-sm" : "bg-white border-slate-100"
            )}>
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-slate-800">{step.title}</h4>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  {step.category}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{step.description}</p>
              {step.status === 'current' && (
                <button className="text-xs font-semibold text-brand-600 flex items-center gap-1 hover:gap-2 transition-all">
                  Continue Learning <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
