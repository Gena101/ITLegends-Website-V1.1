// src/components/seo/LastUpdated.tsx
// Visible "Last updated" line (AEO §2.1). Dates come from routes.json - the
// same source as SeoHead's dateModified and the sitemap lastmod - so the
// three can never drift. Renders nothing when the date is unknown (null).
import { useLocation } from 'react-router-dom';
import routesData from '../../data/routes.json'
import { toCanonical } from '../../lib/canonical';
import { formatDate } from '../../lib/dates';

type LastUpdatedProps = {
  /** Defaults to the current route. */
  path?: string;
  /** Also show the published date (blog posts). */
  showPublished?: boolean;
  className?: string;
};

export default function LastUpdated({ path, showPublished = false, className = ''}: LastUpdatedProps) {
  const { pathname } = useLocation();
  const target = new URL(toCanonical(path ?? pathname)).pathname;
  const route = routesData.routes.find((r) => r.path === target);

  const modified = route?.modified ?? null;
  const published = route?.published ?? null;
  const modifiedText = modified ? formatDate(modified) : null;
  const publishedText = showPublished && published ? formatDate(published) : null;

  if (!modifiedText && !publishedText) return null;

  return (
    <p className={`text-small text-muted ${className}`.trim()}>
      {publishedText && published && (
        <>
          Published: <time dateTime={published}>{publishedText}</time>
          {modifiedText && ' · '}
        </>
      )}
      {modifiedText && modified && (
        <>
          Last updated: <time dateTime={modified}>{modifiedText}</time>
        </>
      )}
    </p>
  );
}