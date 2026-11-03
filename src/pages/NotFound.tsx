// src/pages/NotFound.tsx
import { Layout } from '../components/layout';
import { SeoHead } from '../components/seo';
import { Button, Section, SectionHeading } from '../components/ui';
import { company } from '../data/company';
import { useRenderStatus } from '../render-status';

export default function NotFound() {
  useRenderStatus(404);

  return (
    <Layout>
      <SeoHead
        title="Page not found | IT Legends"
        description="The page you were looking for doesn't exist or has moved."
        path="/404"
        noindex
      />
      <Section spacing="flush" backdrop="grid" className="pt-header" labelledBy="not-found-title">
        <div className="py-24 sm:py-32">
          <SectionHeading
            as="h1"
            id="not-found-title"
            title="This page doesn't exist"
            intro="It may have moved while we updated our website. Head back to the homepage, or call us and we'll point you in the right direction."
            actions={
              <>
                <Button href="/" size="lg">
                  Go to the homepage
                </Button>
                <Button href={company.phone.href} variant="secondary" size="lg">
                  Call {company.phone.display}
                </Button>
              </>
            }
          />
        </div>
      </Section>
    </Layout>
  );
}