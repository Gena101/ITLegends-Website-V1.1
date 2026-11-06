// src/pages/Pricing.tsx
// /pricing: the managed IT plans, comparison table, add-ons, terms, onboarding and FAQ.
// Every figure comes from src/data (pricing.ts, plan-features.ts, pricing-page.ts).
import { Check, Minus, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ContactSection, FaqList, ProcessSteps } from '../components/sections';
import { breadcrumbSchema, faqSchema, offerCatalogSchema, SeoHead } from '../components/seo';
import { Breadcrumbs, Button, Card, Container, Reveal, Section, SectionHeading, cn } from '../components/ui';
import { company } from '../data/company';
import { managedOnboarding } from '../data/onboarding';
import { featureGroups, notIncluded, planCardItems, planFeatures, type FeatureValue } from '../data/plan-features';
import { planTerms, pricingFaqs } from '../data/pricing-page';
import {
  cloudBackup,
  contractTerms,
  formatRand,
  getPlan,
  planAddOns,
  plans,
  startingPrice,
  VAT_NOTE,
  workspaceBackup,
} from '../data/pricing';
import { getService, servicePath } from '../data/services';
import { countWord, joinList } from '../lib/text';

const path = '/pricing';
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path },
];

const managedItService = getService('managed-it-support');
if (!managedItService) throw new Error('Pricing page needs the managed-it-support service');
const managedIt = managedItService;

const intro =
  `IT Legends has ${countWord(plans.length)} managed IT plans for Gauteng businesses: ` +
  `${joinList(plans.map((p) => `${p.name} ${formatRand(p.pricePerDevice)}`))} per device per month, ${VAT_NOTE}. ` +
  'Every plan includes remote helpdesk, monitoring, patching, endpoint protection and on-site visits. ' +
  `Contracts are month-to-month, or 12 months with ${contractTerms.annualDiscountPercent}% off.`;

const planNames = (ids: readonly string[], include: boolean) =>
  joinList(plans.filter((p) => ids.includes(p.id) === include).map((p) => p.name));

const essential = getPlan('essential');
const retention = (days: number) => (days === 365 ? 'one year' : `${days} days`);

const addOns = [
  {
    title: 'Cloud backup',
    price: formatRand(cloudBackup.pricePerDevice),
    unit: 'per device per month',
    text:
      `For PCs, laptops and servers; you choose which devices. Includes ${cloudBackup.includedStorageGbPerDevice} GB per device, ` +
      `pooled across your site, and ${retention(cloudBackup.includedRetentionDays)} of retention. Backups are monitored and restores are tested quarterly.`,
    note: `Storage beyond the pool: ${formatRand(cloudBackup.overagePerGb)} per GB per month.`,
    link: { href: servicePath('cloud-backup'), label: 'How our backups work' },
  },
  {
    title: 'Microsoft 365 and Google Workspace backup',
    price: formatRand(workspaceBackup.pricePerUser),
    unit: 'per user per month',
    text:
      `Backs up mail, OneDrive or Google Drive, calendars and contacts, with ${workspaceBackup.includedStorageGbPerUser} GB per user ` +
      `pooled across your organisation and ${retention(workspaceBackup.includedRetentionDays)} of retention.`,
    note: 'SharePoint, Teams and shared drives are quoted per organisation.',
  },
  {
    title: `Webroot on ${essential.name}`,
    price: formatRand(planAddOns.webroot.pricePerDevice),
    unit: 'per device per month',
    text:
      `Upgrades ${essential.name} from Microsoft Defender to Webroot endpoint protection. ` +
      `${planNames(planAddOns.webroot.availableOn, false)} include Webroot.`,
  },
  {
    title: 'Disaster recovery plan',
    price: formatRand(planAddOns.disasterRecoveryPlan.onceOff),
    unit: 'once-off',
    text:
      'A plan for getting your business running again after a major outage: what is restored first, and how. ' +
      `Included in ${planNames(planAddOns.disasterRecoveryPlan.includedIn, true)}.`,
  },
];

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function FeatureCell({ value }: { value: FeatureValue }) {
  if (value.kind === 'none') {
    return (
      <>
        <Minus aria-hidden="true" className="mx-auto h-4 w-4 text-fg-subtle" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  if (value.kind === 'addOn') {
    return <span className="text-sm text-fg-muted">Add-on: {value.detail}</span>;
  }
  if (value.detail) {
    return <span className="text-sm text-fg">{capitalise(value.detail)}</span>;
  }
  return (
    <>
      <Check aria-hidden="true" className="mx-auto h-5 w-5 text-itblue-soft" />
      <span className="sr-only">Included</span>
    </>
  );
}

export default function Pricing() {
  return (
    <Layout>
      <SeoHead
        title="Managed IT Pricing: Plans, Add-ons and Terms | IT Legends"
        description={`Managed IT plans from ${formatRand(startingPrice)} per device per month (${VAT_NOTE}). Compare what each plan includes, backup add-ons, on-site visits and terms.`}
        path={path}
        schema={[
          breadcrumbSchema(crumbs),
          offerCatalogSchema({
            serviceName: managedIt.name,
            servicePath: servicePath(managedIt.slug),
            catalogName: 'Managed IT plans',
            pagePath: path,
            offers: plans.map((p, i) => ({
              name: p.name,
              description: `${i > 0 ? `Everything in ${plans[i - 1].name}, plus: ` : ''}${planCardItems(p.id).join('; ')}`,
              prices: [
                { price: p.pricePerDevice, unitText: 'per device per month' },
                ...(p.pricePerServer ? [{ price: p.pricePerServer, unitText: 'per server per month' }] : []),
              ],
            })),
          }),
          faqSchema(pricingFaqs),
        ]}
      />

      {/* Hero: never wrapped in Reveal (LCP) */}
      <section aria-labelledby="pricing-title" className="mesh-backdrop relative isolate overflow-hidden bg-ink-950 pt-header">
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl">
            <h1 id="pricing-title" className="text-h1">
              Managed IT pricing
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#contact" size="lg">
                Book a free IT assessment
              </Button>
              <Button href={company.phone.href} variant="secondary" size="lg">
                <Phone aria-hidden="true" className="h-5 w-5" />
                {company.phone.display}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Plan cards */}
      <Section backdrop="grid" divider labelledBy="plans-title">
        <Reveal>
          <SectionHeading
            id="plans-title"
            title="Choose a plan"
            intro={`All prices are per device per month, ${VAT_NOTE}. Each plan includes everything in the plan before it.`}
          />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => {
              const previous = i > 0 ? plans[i - 1] : null;
              return (
                <Card key={plan.id} as="li" padding="lg" className="flex h-full flex-col">
                  <h3 className="text-h3">{plan.name}</h3>
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                    <span className="font-display text-4xl font-semibold text-white">{formatRand(plan.pricePerDevice)}</span>
                    <span className="text-sm text-fg-muted">per device per month, {VAT_NOTE}</span>
                  </p>
                  {previous && (
                    <p className="mt-6 text-sm font-semibold text-white">Everything in {previous.name}, plus:</p>
                  )}
                  <ul className={cn('space-y-3', previous ? 'mt-3' : 'mt-6')}>
                    {planCardItems(plan.id).map((text) => (
                      <li key={text} className="flex gap-3 text-sm text-fg">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-itblue-soft" />
                        {text}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href="#contact" variant="secondary" className="w-full">
                      Ask about {plan.name}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </ul>
        </Reveal>
      </Section>

      {/* Comparison table */}
      <Section tone="raised" divider labelledBy="compare-title">
        <Reveal>
          <SectionHeading id="compare-title" title="Compare the plans" />
        </Reveal>
        <Reveal>
          <div className="relative mt-12 overflow-x-auto rounded-card border border-white/10">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <caption className="sr-only">What each managed IT plan includes</caption>
              <thead>
                <tr className="border-b border-white/10 bg-ink-800">
                  <th scope="col" className="w-2/5 p-4 text-sm font-semibold text-fg-muted">
                    Included
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className="p-4 text-center">
                      <span className="block font-display text-base font-semibold text-white">{p.name}</span>
                      <span className="block text-sm font-normal text-fg-muted">
                        {formatRand(p.pricePerDevice)} per device
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              {featureGroups.map((group) => (
                <tbody key={group.id}>
                  <tr className="bg-white/[0.03]">
                    <th
                      scope="colgroup"
                      colSpan={plans.length + 1}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-itblue-soft"
                    >
                      {group.label}
                    </th>
                  </tr>
                  {planFeatures
                    .filter((f) => f.group === group.id)
                    .map((f) => (
                      <tr key={f.id} className="border-t border-white/5">
                        <th scope="row" className="p-4 text-sm font-normal text-fg">
                          {f.label}
                        </th>
                        {plans.map((p) => (
                          <td key={p.id} className="p-4 text-center align-middle">
                            <FeatureCell value={f.values[p.id]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-fg-muted">
            Not included in any plan, quoted separately:{' '}
            {joinList(notIncluded.map((item) => item.toLowerCase()))}.
          </p>
        </Reveal>
      </Section>

      {/* Add-ons */}
      <Section divider labelledBy="addons-title">
        <Reveal>
          <SectionHeading
            id="addons-title"
            title="Add-ons"
            intro={`Available on any plan unless stated, ${VAT_NOTE}. Cloud backup and Microsoft 365 / Google Workspace backup can also be taken on their own, without a managed IT plan.`}
          />
        </Reveal>
        <Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {addOns.map((a) => (
              <Card key={a.title} as="li" className="flex h-full flex-col">
                <h3 className="text-base font-semibold text-white">{a.title}</h3>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-2xl font-semibold text-white">{a.price}</span>
                  <span className="text-sm text-fg-muted">{a.unit}</span>
                </p>
                <p className="mt-4 text-sm text-fg-muted">{a.text}</p>
                {a.note && <p className="mt-3 text-sm text-fg-subtle">{a.note}</p>}
                {a.link && (
                  <Link
                    to={a.link.href}
                    className="mt-auto pt-5 text-sm font-semibold text-itblue-soft transition-colors hover:text-white"
                  >
                    {a.link.label}
                  </Link>
                )}
              </Card>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-16 max-w-3xl">
            <h3 className="text-h3">Keeping device backups for longer</h3>
            <p className="mt-3 text-fg-muted">
              Cloud backup keeps {retention(cloudBackup.includedRetentionDays)} of versions. Longer retention is priced per site per
              month ({VAT_NOTE}); extra storage beyond your pool is billed at the normal rate.
            </p>
            <div className="relative mt-6 overflow-x-auto rounded-card border border-white/10">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Longer backup retention, per site per month</caption>
                <thead>
                  <tr className="border-b border-white/10 bg-ink-800">
                    <th scope="col" className="p-4 text-sm font-semibold text-fg-muted">
                      Retention
                    </th>
                    <th scope="col" className="p-4 text-right text-sm font-semibold text-fg-muted">
                      Per site per month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cloudBackup.retentionOptions.map((r) => (
                    <tr key={r.days} className="border-t border-white/5">
                      <th scope="row" className="p-4 text-sm font-semibold text-white">
                        {r.days} days
                      </th>
                      <td className="p-4 text-right text-sm text-fg">{formatRand(r.pricePerSite)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Terms */}
      <Section tone="raised" divider labelledBy="terms-title">
        <Reveal>
          <SectionHeading id="terms-title" title="Plan terms" />
        </Reveal>
        <Reveal>
          <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {planTerms.map((t) => (
              <div key={t.title}>
                <dt className="text-base font-semibold text-white">{t.title}</dt>
                <dd className="mt-2 text-sm text-fg-muted">{t.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <ProcessSteps id="get-started" title="How to get started" steps={managedOnboarding} />

      <Section tone="raised" divider labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" title="Pricing questions" />
          </Reveal>
          <FaqList items={pricingFaqs} className="lg:col-span-8" />
        </div>
      </Section>

      <ContactSection
        title="Get a quote for your business"
        intro={`Book a free IT assessment or ask about the plans. We respond ${company.support.standardResponse}.`}
        defaultService={managedIt.name}
        tone="base"
      />
    </Layout>
  );
}