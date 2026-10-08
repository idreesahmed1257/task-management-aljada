/**
 * Demo seed — wipes employees + tasks, inserts realistic demo data.
 * Admin account is untouched. Safe to re-run.
 *
 * npm run seed:demo
 */
import { connectDatabase } from './config/database';
import { Employee } from './modules/employees/model';
import { Task } from './modules/tasks/model';

function d(offsetDays: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(17, 0, 0, 0);
  return date;
}

const EMPLOYEES = [
  { name: 'Sarah Chen',      email: 'sarah.chen@demo.com',      position: 'Marketing Manager' },
  { name: 'James Okafor',    email: 'james.okafor@demo.com',    position: 'Content Strategist' },
  { name: 'Emma Rodriguez',  email: 'emma.rodriguez@demo.com',  position: 'Brand Designer' },
  { name: 'Liam Park',       email: 'liam.park@demo.com',       position: 'Senior Engineer' },
  { name: 'Priya Nair',      email: 'priya.nair@demo.com',      position: 'Frontend Developer' },
  { name: 'Marcus Webb',     email: 'marcus.webb@demo.com',     position: 'DevOps Engineer' },
  { name: 'Aisha Malik',     email: 'aisha.malik@demo.com',     position: 'Operations Lead' },
  { name: 'Noah Kim',        email: 'noah.kim@demo.com',        position: 'Data Analyst' },
  { name: 'Sofia Andersen',  email: 'sofia.andersen@demo.com',  position: 'Sales Manager' },
  { name: 'Ethan Torres',    email: 'ethan.torres@demo.com',    position: 'Account Executive' },
];

type TaskSeed = {
  employeeKey: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  dueDays: number;
};

const TASKS: TaskSeed[] = [
  // Sarah Chen — Marketing Manager (5 tasks)
  {
    employeeKey: 'sarah.chen@demo.com',
    title: 'Launch Q4 campaign brief',
    description: 'Draft and align the Q4 brand campaign brief with stakeholders before kickoff.',
    priority: 'high', status: 'in_progress', dueDays: 5,
  },
  {
    employeeKey: 'sarah.chen@demo.com',
    title: 'Social media content calendar',
    description: 'Build out the November content calendar across LinkedIn, Instagram, and X.',
    priority: 'medium', status: 'completed', dueDays: -3,
  },
  {
    employeeKey: 'sarah.chen@demo.com',
    title: 'Influencer partnership proposal',
    description: 'Research and propose three micro-influencer partnerships for the product launch.',
    priority: 'medium', status: 'pending', dueDays: 10,
  },
  {
    employeeKey: 'sarah.chen@demo.com',
    title: 'Email newsletter redesign',
    description: 'Update the email template with the new brand guidelines and test deliverability.',
    priority: 'low', status: 'completed', dueDays: -8,
  },
  {
    employeeKey: 'sarah.chen@demo.com',
    title: 'Competitor analysis report',
    description: 'Prepare a quarterly competitor analysis covering pricing, messaging, and positioning.',
    priority: 'high', status: 'in_progress', dueDays: 2,
  },

  // James Okafor — Content Strategist (4 tasks)
  {
    employeeKey: 'james.okafor@demo.com',
    title: 'Blog series: Product deep-dive',
    description: 'Write a 3-part blog series covering the platform\'s core features for inbound traffic.',
    priority: 'medium', status: 'in_progress', dueDays: 7,
  },
  {
    employeeKey: 'james.okafor@demo.com',
    title: 'SEO keyword audit',
    description: 'Audit existing page rankings and identify gaps in keyword coverage.',
    priority: 'high', status: 'pending', dueDays: 3,
  },
  {
    employeeKey: 'james.okafor@demo.com',
    title: 'Case study: Acme Corp',
    description: 'Draft a customer success case study using the Acme onboarding data.',
    priority: 'medium', status: 'completed', dueDays: -5,
  },
  {
    employeeKey: 'james.okafor@demo.com',
    title: 'Video script: Onboarding walkthrough',
    description: 'Write a concise 3-minute script for the new-user onboarding tutorial video.',
    priority: 'low', status: 'pending', dueDays: 14,
  },

  // Emma Rodriguez — Brand Designer (3 tasks)
  {
    employeeKey: 'emma.rodriguez@demo.com',
    title: 'Brand asset refresh',
    description: 'Update logo variations, color palette, and icon set per new brand guidelines.',
    priority: 'high', status: 'in_progress', dueDays: 4,
  },
  {
    employeeKey: 'emma.rodriguez@demo.com',
    title: 'Product landing page mockup',
    description: 'Design responsive mockups for the new product landing page (desktop + mobile).',
    priority: 'medium', status: 'pending', dueDays: 8,
  },
  {
    employeeKey: 'emma.rodriguez@demo.com',
    title: 'Trade show booth design',
    description: 'Create booth artwork and banner files for the November trade show.',
    priority: 'low', status: 'pending', dueDays: 18,
  },

  // Liam Park — Senior Engineer (5 tasks)
  {
    employeeKey: 'liam.park@demo.com',
    title: 'API rate limiting implementation',
    description: 'Add rate limiting middleware to all public API endpoints.',
    priority: 'high', status: 'completed', dueDays: -2,
  },
  {
    employeeKey: 'liam.park@demo.com',
    title: 'Database query optimisation',
    description: 'Profile and optimise the three slowest queries on the reporting pipeline.',
    priority: 'high', status: 'in_progress', dueDays: 3,
  },
  {
    employeeKey: 'liam.park@demo.com',
    title: 'Authentication service refactor',
    description: 'Refactor the auth module to support OAuth 2.0 in preparation for SSO.',
    priority: 'medium', status: 'in_progress', dueDays: 6,
  },
  {
    employeeKey: 'liam.park@demo.com',
    title: 'Unit test coverage: core modules',
    description: 'Bring test coverage for auth, billing, and task modules up to 80%.',
    priority: 'medium', status: 'pending', dueDays: 9,
  },
  {
    employeeKey: 'liam.park@demo.com',
    title: 'Deployment pipeline fix',
    description: 'Fix the broken staging deployment step introduced in the last infra update.',
    priority: 'high', status: 'completed', dueDays: -6,
  },

  // Priya Nair — Frontend Developer (4 tasks)
  {
    employeeKey: 'priya.nair@demo.com',
    title: 'Dashboard chart components',
    description: 'Build reusable chart components for the analytics dashboard using SVG.',
    priority: 'medium', status: 'completed', dueDays: -1,
  },
  {
    employeeKey: 'priya.nair@demo.com',
    title: 'Accessibility audit — main nav',
    description: 'Run WCAG 2.1 AA checks on the navigation and fix any violations found.',
    priority: 'medium', status: 'in_progress', dueDays: 5,
  },
  {
    employeeKey: 'priya.nair@demo.com',
    title: 'Mobile responsive fixes',
    description: 'Address the layout breakage on screens below 480px reported in issue #204.',
    priority: 'high', status: 'pending', dueDays: 2,
  },
  {
    employeeKey: 'priya.nair@demo.com',
    title: 'Form validation improvements',
    description: 'Add inline validation to all account management forms.',
    priority: 'low', status: 'completed', dueDays: -4,
  },

  // Marcus Webb — DevOps Engineer (3 tasks)
  {
    employeeKey: 'marcus.webb@demo.com',
    title: 'Kubernetes cluster upgrade',
    description: 'Upgrade the staging and production clusters from v1.27 to v1.29.',
    priority: 'high', status: 'in_progress', dueDays: 4,
  },
  {
    employeeKey: 'marcus.webb@demo.com',
    title: 'SSL certificate renewal',
    description: 'Renew the wildcard SSL certificate expiring at end of month.',
    priority: 'high', status: 'completed', dueDays: -1,
  },
  {
    employeeKey: 'marcus.webb@demo.com',
    title: 'Backup policy documentation',
    description: 'Document the current backup schedules and retention policies in Confluence.',
    priority: 'low', status: 'pending', dueDays: 15,
  },

  // Aisha Malik — Operations Lead (4 tasks)
  {
    employeeKey: 'aisha.malik@demo.com',
    title: 'Q3 vendor invoice reconciliation',
    description: 'Match all outstanding vendor invoices to POs and close out the quarter.',
    priority: 'medium', status: 'completed', dueDays: -7,
  },
  {
    employeeKey: 'aisha.malik@demo.com',
    title: 'New hire onboarding checklist',
    description: 'Update the onboarding checklist to reflect the new tools and processes.',
    priority: 'low', status: 'in_progress', dueDays: 8,
  },
  {
    employeeKey: 'aisha.malik@demo.com',
    title: 'Office supplies procurement',
    description: 'Order Q4 office supplies based on usage trends from Q3.',
    priority: 'low', status: 'completed', dueDays: -10,
  },
  {
    employeeKey: 'aisha.malik@demo.com',
    title: 'Process audit: support tickets',
    description: 'Review the support ticket handling process and identify bottlenecks.',
    priority: 'medium', status: 'pending', dueDays: 6,
  },

  // Noah Kim — Data Analyst (2 tasks)
  {
    employeeKey: 'noah.kim@demo.com',
    title: 'Monthly metrics report',
    description: 'Compile and visualise the October product and revenue metrics for leadership.',
    priority: 'medium', status: 'pending', dueDays: 1,
  },
  {
    employeeKey: 'noah.kim@demo.com',
    title: 'Churn cohort analysis',
    description: 'Build a cohort analysis on the last 6 months of churn data to identify patterns.',
    priority: 'high', status: 'in_progress', dueDays: 5,
  },

  // Sofia Andersen — Sales Manager (4 tasks)
  {
    employeeKey: 'sofia.andersen@demo.com',
    title: 'Q4 sales forecast',
    description: 'Model the Q4 revenue forecast across pipeline stages and present to leadership.',
    priority: 'high', status: 'pending', dueDays: 2,
  },
  {
    employeeKey: 'sofia.andersen@demo.com',
    title: 'CRM data cleanup',
    description: 'Remove duplicate contacts and update deal stages in HubSpot.',
    priority: 'medium', status: 'completed', dueDays: -5,
  },
  {
    employeeKey: 'sofia.andersen@demo.com',
    title: 'Sales playbook update',
    description: 'Revise the sales playbook to reflect the new pricing structure and ICP.',
    priority: 'medium', status: 'in_progress', dueDays: 10,
  },
  {
    employeeKey: 'sofia.andersen@demo.com',
    title: 'Enterprise prospect outreach',
    description: 'Identify and reach out to 20 enterprise prospects in the fintech vertical.',
    priority: 'low', status: 'pending', dueDays: 12,
  },

  // Ethan Torres — Account Executive (2 tasks)
  {
    employeeKey: 'ethan.torres@demo.com',
    title: 'Demo prep: Greenfield Corp',
    description: "Customise the product demo environment with Greenfield's branding and use case.",
    priority: 'high', status: 'in_progress', dueDays: 1,
  },
  {
    employeeKey: 'ethan.torres@demo.com',
    title: 'Contract renewal: Bluewave Ltd',
    description: 'Negotiate and close the annual contract renewal with Bluewave before month end.',
    priority: 'medium', status: 'pending', dueDays: 7,
  },
];

async function seedDemo() {
  await connectDatabase();

  console.log('[demo] Clearing existing employees and tasks…');
  await Task.deleteMany({});
  await Employee.deleteMany({});

  console.log('[demo] Creating employees…');
  const employees = await Employee.insertMany(EMPLOYEES);

  const emailToId = new Map(employees.map((e) => [e.email, e._id]));

  console.log('[demo] Creating tasks…');
  const taskDocs = TASKS.map((t) => ({
    title: t.title,
    description: t.description,
    priority: t.priority,
    status: t.status,
    dueDate: d(t.dueDays),
    employeeId: emailToId.get(t.employeeKey),
  }));

  await Task.insertMany(taskDocs);

  const counts = {
    employees: employees.length,
    tasks: taskDocs.length,
    pending: TASKS.filter((t) => t.status === 'pending').length,
    in_progress: TASKS.filter((t) => t.status === 'in_progress').length,
    completed: TASKS.filter((t) => t.status === 'completed').length,
    high: TASKS.filter((t) => t.priority === 'high').length,
    medium: TASKS.filter((t) => t.priority === 'medium').length,
    low: TASKS.filter((t) => t.priority === 'low').length,
  };

  console.log('[demo] Done.');
  console.table(counts);
  process.exit(0);
}

seedDemo().catch((err) => {
  console.error('[demo] Error:', err);
  process.exit(1);
});
