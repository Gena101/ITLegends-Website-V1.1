// src/components/icons/ServiceIcons.tsx
// Custom per-service icons: 24px grid, 1.5 stroke, round caps/joins, currentColor.
// The filled dot in most icons echoes the hero network's nodes/packets.
// Decorative by default (aria-hidden); the service name next to the icon is the accessible text.
import type { ComponentType, ReactNode, SVGProps } from 'react';
import type { ServiceSlug } from '../../data/services';

export type IconProps = SVGProps<SVGSVGElement>;

/** Filled "packet" dot */
function Dot({ cx, cy, r = 1.1 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />;
}

function createIcon(displayName: string, children: ReactNode): ComponentType<IconProps> {
  function Icon(props: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {children}
      </svg>
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

export const ManagedSupportIcon = createIcon(
  'ManagedSupportIcon',
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M12 16v4M8.5 20h7" />
    <path d="M6.5 10.5h2.5l1.5-3 2.5 6 1.5-3h1.5" />
    <Dot cx={17.5} cy={10.5} />
  </>,
);

export const HelpdeskIcon = createIcon(
  'HelpdeskIcon',
  <>
    <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H14" />
    <Dot cx={12.6} cy={22} />
  </>,
);

export const CybersecurityIcon = createIcon(
  'CybersecurityIcon',
  <>
    <path d="M12 3l7 3v5.2c0 4.4-2.9 8.1-7 9.8-4.1-1.7-7-5.4-7-9.8V6z" />
    <Dot cx={12} cy={10.5} r={1.6} />
    <path d="M12 12v3.5" />
  </>,
);

export const CloudBackupIcon = createIcon(
  'CloudBackupIcon',
  <>
    <path d="M7 18.5h10a4 4 0 0 0 .4-7.98A5.5 5.5 0 0 0 6.7 11.6 3.5 3.5 0 0 0 7 18.5z" />
    <path d="M12 16.5v-5M9.8 13.7 12 11.5l2.2 2.2" />
  </>,
);

export const ServerIcon = createIcon(
  'ServerIcon',
  <>
    <rect x="4" y="4" width="16" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="16" height="6.5" rx="1.5" />
    <Dot cx={7.75} cy={7.25} />
    <Dot cx={7.75} cy={16.75} />
    <path d="M11.5 7.25h5M11.5 16.75h5" />
  </>,
);

export const HardwareNetworkIcon = createIcon(
  'HardwareNetworkIcon',
  <>
    <rect x="7" y="3" width="10" height="7" rx="1.5" />
    <path d="M12 10v4" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <Dot cx={7} cy={17} r={1} />
    <path d="M10.5 17h1M14 17h1M17.5 17h0" />
  </>,
);

export const CablingIcon = createIcon(
  'CablingIcon',
  <>
    <path d="M12 7.5V6c0-2.2 4-1.6 4-3.5" />
    <rect x="6" y="7.5" width="12" height="10" rx="1.75" />
    <path d="M9 7.5v3.25M12 7.5v3.25M15 7.5v3.25" />
    <path d="M9.5 17.5v3h5v-3" />
  </>,
);

export const ConnectivityIcon = createIcon(
  'ConnectivityIcon',
  <>
    <Dot cx={12} cy={9.5} r={1.5} />
    <path d="M8.8 6.3a4.5 4.5 0 0 0 0 6.4M15.2 6.3a4.5 4.5 0 0 1 0 6.4M6 3.5a8.5 8.5 0 0 0 0 12M18 3.5a8.5 8.5 0 0 1 0 12" />
    <path d="M12 11.5V21M9 21h6" />
  </>,
);

export const WebsiteIcon = createIcon(
  'WebsiteIcon',
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8.5h18" />
    <Dot cx={6} cy={6.25} r={0.8} />
    <Dot cx={8.5} cy={6.25} r={0.8} />
    <rect x="6" y="11.5" width="5" height="5.5" rx="1" />
    <path d="M14 12.5h4M14 15.75h4" />
  </>,
);

export const SoftwareIcon = createIcon(
  'SoftwareIcon',
  <path d="M8 7.5 3.5 12 8 16.5M16 7.5l4.5 4.5-4.5 4.5M13.5 5l-3 14" />,
);

/** One icon per service; Record so a new service without an icon fails the typecheck */
export const serviceIcons: Record<ServiceSlug, ComponentType<IconProps>> = {
  'managed-it-support': ManagedSupportIcon,
  helpdesk: HelpdeskIcon,
  cybersecurity: CybersecurityIcon,
  'cloud-backup': CloudBackupIcon,
  'server-maintenance': ServerIcon,
  'hardware-network': HardwareNetworkIcon,
  'structured-cabling': CablingIcon,
  'business-connectivity': ConnectivityIcon,
  'website-design': WebsiteIcon,
  'custom-software': SoftwareIcon,
};

export function ServiceIcon({ slug, ...props }: IconProps & { slug: ServiceSlug }) {
  const Icon = serviceIcons[slug];
  return <Icon {...props} />;
}