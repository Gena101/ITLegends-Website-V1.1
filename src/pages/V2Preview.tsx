// src/pages/V2Preview.tsx
// TEMPORARY design-system preview at /v2-preview (noindex). Delete in Phase 1 Step 7.
import { Layout } from '../components/layout';
import { SeoHead } from '../components/seo';
import { HeroBackdrop } from '../components/three';
import { Badge, Button, Card, Container, Section, SectionHeading } from '../components/ui';
import { company } from '../data/company';
import { pillars, servicesByPillar } from '../data/services';
import { CtaBand, FaqList, ServiceGrid } from '../components/sections';
import { homeFaqs } from '../data/faqs';

export default function V2Preview() {
  return (
    <Layout>
      <SeoHead
        title="v2 preview | IT Legends"
        description="Internal preview of the v2 design system."
        path="/v2-preview"
        noindex
      />

      <section aria-labelledby="preview-title" className="relative isolate overflow-hidden bg-ink-950 pt-header">
        <HeroBackdrop />
        <Container className="relative flex min-h-[85svh] items-center py-20">
          <div>
            <Badge tone="blue">Design preview</Badge>
            <SectionHeading
              as="h1"
              id="preview-title"
              className="mt-5"
              title="Sample heading at H1 size for checking the type scale"
              intro="This paragraph shows the lead text style used for the 40 to 60 word direct answer under each page heading. It checks line length, contrast and spacing over the hero network before real copy goes in."
              actions={
                <>
                  <Button href="/contact" size="lg">
                    Contact us
                  </Button>
                  <Button href={company.phone.href} variant="secondary" size="lg">
                    Call {company.phone.display}
                  </Button>
                </>
              }
            />
          </div>
        </Container>
      </section>

      <Section backdrop="grid" divider labelledBy="preview-services">
        <SectionHeading
          id="preview-services"
          title="Services by pillar"
          intro="Glass cards over the grid backdrop, reading from services.ts."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.id} as="article" interactive>
              <Badge tone={pillar.id === 'digital' ? 'red' : 'blue'}>{pillar.name}</Badge>
              <p className="mt-4 text-sm text-fg-muted">{pillar.summary}</p>
              <ul className="mt-5 space-y-3">
                {servicesByPillar(pillar.id).map((s) => (
                  <li key={s.slug}>
                    <h3 className="text-base font-semibold text-white">{s.name}</h3>
                    <p className="mt-1 text-sm text-fg-subtle">{s.summary}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="raised" divider labelledBy="preview-type">
        <SectionHeading id="preview-type" title="Type scale and surfaces" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card variant="solid">
            <p className="text-sm text-fg-subtle">Solid card</p>
            <p className="mt-2 font-display text-h3 text-white">H3 sample</p>
          </Card>
          <Card variant="outline">
            <p className="text-sm text-fg-subtle">Outline card</p>
            <p className="mt-2 text-fg">Body text in Inter at the base size.</p>
          </Card>
          <Card>
            <p className="text-sm text-fg-subtle">Glass card</p>
            <p className="mt-2 font-display text-display leading-none text-white tabular-nums">2020</p>
          </Card>
        </div>
      </Section>

            <ServiceGrid title="Preview: ServiceGrid" intro="Pillar rows with clickable service cards." />

      <Section divider labelledBy="preview-faq">
        <SectionHeading id="preview-faq" title="Preview: FaqList" />
        <FaqList items={homeFaqs} className="mt-10" />
      </Section>

      <CtaBand title="Preview: CtaBand" text="Mesh panel with phone and WhatsApp." />
    </Layout>
  );
}