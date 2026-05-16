import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Zap, ArrowUpRight } from 'lucide-react';
import { getAllProjects, getAllTasks } from '../database/db';
import type { Project, Task } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts';
import { Skeleton } from '../components/Feedback';

// ============================================
// CHART THEME
// ============================================
const CHART_COLORS = ['#2f3eff', '#06b6d4', '#84cc16', '#eab308', '#973593', '#fa7a7a'];

const ChartTooltipStyle = {
  contentStyle: {
    background: '#fcf8ff',
    border: '2px solid #1b1b22',
    borderRadius: 0,
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
    boxShadow: '4px 4px 0px 0px #1b1b22',
  },
};

// ============================================
// ANALYTICS STAT
// ============================================
function AnalyticsStat({ label, value, change, icon: Icon, color }: {
  label: string;
  value: string | number;
  change: number;
  icon: typeof TrendingUp;
  color: string;
}) {
  const isPositive = change >= 0;
  return (
    <div className={`border-2 border-on-surface dark:border-[#a8a6ff] p-3 md:p-4 ${color} bg-surface dark:bg-[#1e1e2a]`}>
      <div className="flex items-center justify-between mb-1 md:mb-3">
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant dark:text-[#777584]">{label}</p>
        <Icon size={12} className="md:inline text-on-surface-variant dark:text-[#777584]" />
      </div>
      <p className="font-headline font-bold text-lg md:text-2xl text-on-surface dark:text-[#e5e1ea] mb-1">{value}</p>
      <div className={`flex items-center gap-1 font-mono text-xs ${isPositive ? 'text-[#84cc16]' : 'text-[#fa7a7a]'}`}>
        <ArrowUpRight size={12} className={!isPositive ? 'rotate-180' : ''} />
        {Math.abs(change)}% vs last week
      </div>
    </div>
  );
}

// ============================================
// ANALYTICS PAGE
// ============================================
export function AnalyticsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllProjects(), getAllTasks()]).then(([p, t]) => {
      setProjects(p);
      setTasks(t);
      setLoading(false);
    });
  }, []);

  // Derived data
  const tasksByStatus = [
    { name: 'Backlog', value: tasks.filter(t => t.status === 'backlog').length, color: '#777584' },
    { name: 'Todo', value: tasks.filter(t => t.status === 'todo').length, color: '#2f3eff' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: '#06b6d4' },
    { name: 'Review', value: tasks.filter(t => t.status === 'review').length, color: '#eab308' },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length, color: '#84cc16' },
  ];

  const projectProgressData = projects.map(p => ({
    name: p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name,
    progress: p.progress,
    tasks: p.taskCount,
    done: p.completedTasks,
  }));

  // Weekly velocity (mock data based on real tasks)
  const velocityData = [
    { day: 'Mon', completed: 3, added: 5 },
    { day: 'Tue', completed: 6, added: 4 },
    { day: 'Wed', completed: 4, added: 8 },
    { day: 'Thu', completed: 9, added: 3 },
    { day: 'Fri', completed: 7, added: 6 },
    { day: 'Sat', completed: 2, added: 2 },
    { day: 'Sun', completed: 1, added: 1 },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'Critical', value: tasks.filter(t => t.priority === 'critical').length, color: '#fa7a7a' },
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#eab308' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#06b6d4' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#84cc16' },
  ].filter(d => d.value > 0);

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const activeProjects = projects.filter(p => p.status === 'active').length;

  return (
    <div className="flex-1 px-3 py-2 md:px-8 md:py-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-3 md:mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={14} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)]" />
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584] uppercase tracking-widest">Telemetry</span>
        </div>
        <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">Analytics</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-2 border-on-surface dark:border-[#464552] p-4 space-y-3 shadow-hard dark:shadow-[4px_4px_0px_0px_#464552]">
              <Skeleton height="h-3" width="w-20" />
              <Skeleton height="h-8" width="w-16" />
              <Skeleton height="h-3" width="w-24" />
            </div>
          ))
        ) : (
          <>
            <AnalyticsStat label="Completed Tasks" value={completedTasks} change={24} icon={Activity} color="shadow-card-lime" />
            <AnalyticsStat label="In Progress" value={inProgress} change={8} icon={Zap} color="shadow-card-cyan" />
            <AnalyticsStat label="Active Projects" value={activeProjects} change={12} icon={TrendingUp} color="shadow-card-violet" />
            <AnalyticsStat label="Completion Rate" value={tasks.length > 0 ? `${Math.round((completedTasks / tasks.length) * 100)}%` : '0%'} change={-3} icon={BarChart3} color="shadow-card-yellow" />
          </>
        )}
      </div>

      {/* Charts — stacked on mobile */}
      <div className="space-y-4 md:space-y-6">
        {/* Row 1: Velocity + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Weekly Velocity */}
          <section
            className="lg:col-span-2 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]"
            aria-label="Weekly velocity chart"
          >
            <div className="px-3 md:px-5 py-2 md:py-4 border-b-2 border-on-surface dark:border-[#464552] flex items-center justify-between">
              <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Weekly Velocity</h2>
              <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">Tasks/day</span>
            </div>
            <div className="p-3 md:p-5">
              {loading ? <Skeleton height="h-48" /> : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={velocityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2f3eff" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2f3eff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="addedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e5e1ea" strokeOpacity={0.5} />
                    <XAxis dataKey="day" tick={{ fontFamily: 'JetBrains Mono', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontFamily: 'JetBrains Mono', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip {...ChartTooltipStyle} />
                    <Area type="monotone" dataKey="completed" stroke="#2f3eff" strokeWidth={2} fill="url(#completedGrad)" name="Completed" />
                    <Area type="monotone" dataKey="added" stroke="#06b6d4" strokeWidth={2} fill="url(#addedGrad)" name="Added" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          {/* Task by Status Pie */}
          <section
            className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]"
            aria-label="Task status distribution"
          >
            <div className="px-3 md:px-5 py-2 md:py-4 border-b-2 border-on-surface dark:border-[#464552]">
              <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Task Status</h2>
            </div>
            <div className="p-3 md:p-5">
              {loading ? <Skeleton height="h-48" /> : (
                <>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={tasksByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={2} stroke="#1b1b22">
                        {tasksByStatus.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip {...ChartTooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-3">
                    {tasksByStatus.map(item => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 border border-on-surface dark:border-[#464552]" style={{ background: item.color }} />
                          <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">{item.name}</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-on-surface dark:text-[#e5e1ea]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Row 2: Project Progress Bar Chart */}
        <section
          className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]"
          aria-label="Project progress chart"
        >
          <div className="px-3 md:px-5 py-2 md:py-4 border-b-2 border-on-surface dark:border-[#464552] flex items-center justify-between">
            <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Project Progress</h2>
            <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">Completion %</span>
          </div>
          <div className="p-3 md:p-5">
            {loading ? <Skeleton height="h-48" /> : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={projectProgressData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e1ea" strokeOpacity={0.5} horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontFamily: 'JetBrains Mono', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontFamily: 'JetBrains Mono', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip {...ChartTooltipStyle} formatter={(v) => [`${v}%`, 'Progress']} />
                  <Bar dataKey="progress" fill="#2f3eff" radius={0} label={false} maxBarSize={24}>
                    {projectProgressData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Row 3: Priority Distribution */}
        <section
          className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]"
          aria-label="Priority distribution chart"
        >
          <div className="px-3 md:px-5 py-2 md:py-4 border-b-2 border-on-surface dark:border-[#464552]">
            <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Priority Distribution</h2>
          </div>
          <div className="p-3 md:p-5">
            {loading ? <Skeleton height="h-36" /> : (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={priorityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e1ea" strokeOpacity={0.5} />
                  <XAxis dataKey="name" tick={{ fontFamily: 'JetBrains Mono', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontFamily: 'JetBrains Mono', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...ChartTooltipStyle} />
                  <Bar dataKey="value" radius={0} maxBarSize={40}>
                    {priorityData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
