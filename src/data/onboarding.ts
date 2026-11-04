// src/data/onboarding.ts
// How a managed IT client gets started. Shared by Home and the Managed IT service pages.
import { countWord } from '../lib/text';
import { onboarding } from './pricing';

export const managedOnboarding: { title: string; text: string }[] = [
  {
    title: 'Book a free IT assessment',
    text: `We agree a date to visit your office. The assessment is free within ${onboarding.freeAssessmentRadiusKm} km of either branch.`,
  },
  {
    title: 'Get your assessment report',
    text:
      `We assess your current IT setup and send you a written report within ${countWord(onboarding.reportBusinessDays)} business days. ` +
      'The report is yours to keep, whether or not you sign up.',
  },
  {
    title: 'Choose your plan',
    text: 'We talk you through the findings, recommend the plan that fits your business and send a formal quotation.',
  },
  {
    title: 'Go live',
    text:
      `Once you accept, we sign a service level agreement (SLA) and install our management agents on your devices within ${countWord(onboarding.deploymentBusinessDays)} business days. ` +
      'Support is active once the SLA is signed, the agents are installed and the first payment is received.',
  },
];