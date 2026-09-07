import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function make(paths: ReactNode) {
  return function IconComponent({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        {paths}
      </svg>
    );
  };
}

function makeFilled(paths: ReactNode) {
  return function IconComponent({ size = 20, className }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        {paths}
      </svg>
    );
  };
}

/* ---------------------------------- UI ---------------------------------- */

export const Search = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M20.5 20.5L16.9 16.9" />
  </>,
);

export const User = make(
  <>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.6 20c1.3-3.7 4.2-5.6 7.4-5.6S18.1 16.3 19.4 20" />
  </>,
);

export const Cart = make(
  <>
    <path d="M2.6 3.6h2.2l2.2 10.7a1.9 1.9 0 0 0 1.9 1.5h8a1.9 1.9 0 0 0 1.9-1.5L20.4 7H5.9" />
    <circle cx="9.6" cy="20" r="1.4" />
    <circle cx="17.4" cy="20" r="1.4" />
  </>,
);

export const Heart = make(
  <path d="M12 20.4l-1.4-1.3C6 14.9 3 12.1 3 8.7 3 6 5.1 3.9 7.8 3.9c1.5 0 3 .7 4.2 2.1 1.2-1.4 2.7-2.1 4.2-2.1C18.9 3.9 21 6 21 8.7c0 3.4-3 6.2-7.6 10.4z" />,
);

export const HeartFilled = makeFilled(
  <path d="M12 20.6l-1.5-1.4C5.9 15 2.8 12.1 2.8 8.6c0-2.9 2.3-5.2 5.2-5.2 1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.9 0 5.2 2.3 5.2 5.2 0 3.5-3.1 6.4-7.7 10.6z" />,
);

export const Compare = make(
  <>
    <path d="M4 8.5h13" />
    <path d="M14 5.5l3 3-3 3" />
    <path d="M20 15.5H7" />
    <path d="M10 12.5l-3 3 3 3" />
  </>,
);

export const Plus = make(
  <>
    <path d="M12 5.5v13" />
    <path d="M5.5 12h13" />
  </>,
);

export const Minus = make(<path d="M5.5 12h13" />);

export const Close = make(
  <>
    <path d="M6.4 6.4l11.2 11.2" />
    <path d="M17.6 6.4L6.4 17.6" />
  </>,
);

export const Menu = make(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h10" />
  </>,
);

export const ChevronLeft = make(<path d="M14.5 5.5L8 12l6.5 6.5" />);
export const ChevronRight = make(<path d="M9.5 5.5L16 12l-6.5 6.5" />);
export const ChevronDown = make(<path d="M5.5 9L12 15.5 18.5 9" />);
export const ArrowLeft = make(
  <>
    <path d="M19 12H5" />
    <path d="M10.5 5.5L4 12l6.5 6.5" />
  </>,
);

export const Check = make(<path d="M5 12.6l4.4 4.4L19 7.4" />);

export const CheckCircle = make(
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M8.2 12.3l2.6 2.6 5-5.2" />
  </>,
);

export const Filter = make(
  <>
    <path d="M4 6.5h16" />
    <path d="M7 12h10" />
    <path d="M10 17.5h4" />
  </>,
);

export const Trash = make(
  <>
    <path d="M4.5 6.8h15" />
    <path d="M9.5 6.8V5.2a1.4 1.4 0 0 1 1.4-1.4h2.2a1.4 1.4 0 0 1 1.4 1.4v1.6" />
    <path d="M6.6 6.8l.8 12.1a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.8-12.1" />
    <path d="M10.4 10.6v6M13.6 10.6v6" />
  </>,
);

export const Info = make(
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 11v5.2" />
    <path d="M12 7.9h.01" />
  </>,
);

export const Alert = make(
  <>
    <path d="M12 4.2l8.4 14.6H3.6z" />
    <path d="M12 9.6v4" />
    <path d="M12 16.3h.01" />
  </>,
);

export const Logout = make(
  <>
    <path d="M14.5 5.5h3.1a1.9 1.9 0 0 1 1.9 1.9v9.2a1.9 1.9 0 0 1-1.9 1.9h-3.1" />
    <path d="M10 8.4L6.4 12 10 15.6" />
    <path d="M6.6 12H15" />
  </>,
);

/* -------------------------------- Commerce -------------------------------- */

export const Truck = make(
  <>
    <path d="M2.8 6.6h10.6v9.1H2.8z" />
    <path d="M13.4 9.7h3.4l3.4 3.3v2.7h-6.8" />
    <circle cx="7.2" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </>,
);

export const ShieldCheck = make(
  <>
    <path d="M12 3.2l7.2 2.9v5.2c0 4.5-3 8.3-7.2 10.1-4.2-1.8-7.2-5.6-7.2-10.1V6.1z" />
    <path d="M9 12.1l2.1 2.1 4-4.2" />
  </>,
);

export const Support = make(
  <>
    <path d="M20.4 11.6c0 4.1-3.7 7.4-8.3 7.4-1 0-2-.2-3-.5L4 20.2l1.4-3.7c-1-1.4-1.6-3.1-1.6-4.9 0-4.1 3.7-7.4 8.3-7.4s8.3 3.3 8.3 7.4z" />
    <path d="M9.5 10.4a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4" />
    <path d="M12 16.2h.01" />
  </>,
);

export const Return = make(
  <>
    <path d="M4.2 11.2a8 8 0 1 1 1.5 5.6" />
    <path d="M3.4 5.6v5.6h5.6" />
  </>,
);

export const CreditCard = make(
  <>
    <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
    <path d="M3 10h18" />
    <path d="M6.6 14.6h3.6" />
  </>,
);

export const Gift = make(
  <>
    <path d="M4 10.4h16V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
    <path d="M3.2 7.2h17.6v3.2H3.2z" />
    <path d="M12 7.2V21" />
    <path d="M12 7.2H8.4a2.1 2.1 0 1 1 1.5-3.6C11 4.7 12 7.2 12 7.2z" />
    <path d="M12 7.2h3.6a2.1 2.1 0 1 0-1.5-3.6C13 4.7 12 7.2 12 7.2z" />
  </>,
);

export const Package = make(
  <>
    <path d="M3.6 7.6L12 3.3l8.4 4.3v8.8L12 20.7l-8.4-4.3z" />
    <path d="M3.6 7.6L12 12l8.4-4.4" />
    <path d="M12 12v8.7" />
  </>,
);

export const Tag = make(
  <>
    <path d="M11.4 3.4H4v7.4l9.2 9.2 7.4-7.4z" />
    <circle cx="7.6" cy="7.6" r="1.3" />
  </>,
);

export const Flame = make(
  <>
    <path d="M12 3.2c.4 3-1.6 4.4-2.9 5.9-1.3 1.5-2.1 3-2.1 4.7A5 5 0 0 0 12 20.8a5 5 0 0 0 5-7c-.5-1.4-1.7-2.5-1.9-4.1-1 .9-1.6 1.4-2.3 1.4.6-2.2.2-5.3-.8-7.9z" />
  </>,
);

export const Sparkles = make(
  <>
    <path d="M12 3.4l1.6 4.4 4.4 1.6-4.4 1.6L12 15.4l-1.6-4.4L6 9.4l4.4-1.6z" />
    <path d="M18.4 15.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
  </>,
);

export const Bolt = make(<path d="M13.4 2.8L5.6 13.4h5.3l-.9 7.8 8-11H12.4z" />);

export const TrendingUp = make(
  <>
    <path d="M3.4 16.8l5.8-5.8 3.5 3.5 7.9-7.9" />
    <path d="M16.4 6.6h4.2v4.2" />
  </>,
);

export const Star = makeFilled(
  <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" />,
);

export const Clock = make(
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 1.8" />
  </>,
);

export const Phone = make(
  <path d="M6.4 3.6h3l1.6 4-2.1 1.4a12.4 12.4 0 0 0 6.1 6.1l1.4-2.1 4 1.6v3a2 2 0 0 1-2.2 2A17.3 17.3 0 0 1 4.4 5.8a2 2 0 0 1 2-2.2z" />,
);

export const Mail = make(
  <>
    <rect x="3" y="5.2" width="18" height="13.6" rx="2.4" />
    <path d="M3.6 7.2L12 13l8.4-5.8" />
  </>,
);

export const MapPin = make(
  <>
    <path d="M12 21.2s6.9-5.6 6.9-11a6.9 6.9 0 1 0-13.8 0c0 5.4 6.9 11 6.9 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </>,
);

export const Home = make(
  <>
    <path d="M3.8 10.6L12 3.6l8.2 7v9a1.4 1.4 0 0 1-1.4 1.4h-3.9v-6H9.1v6H5.2a1.4 1.4 0 0 1-1.4-1.4z" />
  </>,
);

export const Journal = make(
  <>
    <path d="M4.4 4.6h12.4a2.2 2.2 0 0 1 2.2 2.2v12.6H6.6a2.2 2.2 0 0 1-2.2-2.2z" />
    <path d="M8 8.8h7.4M8 12.4h7.4M8 16h4.6" />
  </>,
);

export const Grid = make(
  <>
    <rect x="3.6" y="3.6" width="7" height="7" rx="1.8" />
    <rect x="13.4" y="3.6" width="7" height="7" rx="1.8" />
    <rect x="3.6" y="13.4" width="7" height="7" rx="1.8" />
    <rect x="13.4" y="13.4" width="7" height="7" rx="1.8" />
  </>,
);

/* ------------------------------ Health domain ----------------------------- */

export const Dumbbell = make(
  <>
    <path d="M6.6 8.4v7.2M3.8 10.2v3.6M17.4 8.4v7.2M20.2 10.2v3.6" />
    <path d="M6.6 12h10.8" />
  </>,
);

export const Shaker = make(
  <>
    <path d="M8 3.6h8l-.6 3H8.6z" />
    <path d="M8.6 6.6h6.8l1 11.4a2.4 2.4 0 0 1-2.4 2.6h-4a2.4 2.4 0 0 1-2.4-2.6z" />
    <path d="M8.2 11.4h7.6" />
  </>,
);

export const Pill = make(
  <>
    <path d="M10.6 20.4a5 5 0 0 1-7-7l6.8-6.8a5 5 0 0 1 7 7z" />
    <path d="M7.6 9.4l7 7" />
  </>,
);

export const Capsules = make(
  <>
    <rect x="3.4" y="9.4" width="10" height="5.4" rx="2.7" />
    <path d="M8.4 9.4v5.4" />
    <circle cx="17.6" cy="7.6" r="3.2" />
    <circle cx="17.6" cy="16.6" r="3.2" />
  </>,
);

export const Sun = make(
  <>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.8v2.4M12 18.8v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
  </>,
);

export const Citrus = make(
  <>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 3.6v16.8M3.6 12h16.8M6 6l12 12M18 6L6 18" />
  </>,
);

export const Fish = make(
  <>
    <path d="M2.8 12c2.9-3.9 6.6-5.4 10-5.4 3.8 0 6.2 2.4 8.4 5.4-2.2 3-4.6 5.4-8.4 5.4-3.4 0-7.1-1.5-10-5.4z" />
    <path d="M2.8 12c1.2-1 2-2.6 2-4.4M2.8 12c1.2 1 2 2.6 2 4.4" />
    <path d="M17.4 11.4h.01" />
  </>,
);

export const Flask = make(
  <>
    <path d="M9.4 3.4h5.2" />
    <path d="M10.4 3.4v6.2L5.6 17.6A2 2 0 0 0 7.3 20.6h9.4a2 2 0 0 0 1.7-3l-4.8-8V3.4" />
    <path d="M7.6 14.6h8.8" />
  </>,
);

export const Flower = make(
  <>
    <circle cx="12" cy="12" r="2.4" />
    <path d="M12 9.6c0-2.6.8-4.4 0-6.2-.8 1.8 0 3.6 0 6.2z" />
    <path d="M12 14.4c0 2.6-.8 4.4 0 6.2.8-1.8 0-3.6 0-6.2z" />
    <path d="M9.6 12c-2.6 0-4.4-.8-6.2 0 1.8.8 3.6 0 6.2 0z" />
    <path d="M14.4 12c2.6 0 4.4.8 6.2 0-1.8-.8-3.6 0-6.2 0z" />
    <path d="M10.3 10.3C8.5 8.5 6.9 7.4 6.4 5.4c2 .5 3.1 2.1 4.9 3.9z" />
    <path d="M13.7 13.7c1.8 1.8 3.4 2.9 3.9 4.9-2-.5-3.1-2.1-4.9-3.9z" />
  </>,
);

export const Teddy = make(
  <>
    <circle cx="12" cy="13.4" r="6" />
    <circle cx="6.6" cy="6.8" r="2.6" />
    <circle cx="17.4" cy="6.8" r="2.6" />
    <path d="M10.2 12.4h.01M13.8 12.4h.01" />
    <path d="M10.4 16c1 .8 2.2.8 3.2 0" />
  </>,
);

export const Face = make(
  <>
    <path d="M12 3.4c4.4 0 7.4 2.8 7.4 7.2 0 5.4-3.3 10-7.4 10s-7.4-4.6-7.4-10c0-4.4 3-7.2 7.4-7.2z" />
    <path d="M9.4 11h.01M14.6 11h.01" />
    <path d="M10 15.2c1.2 1 2.8 1 4 0" />
  </>,
);

export const Droplet = make(
  <path d="M12 3.4c2.6 3 6 6.7 6 10a6 6 0 1 1-12 0c0-3.3 3.4-7 6-10z" />,
);

export const Dropper = make(
  <>
    <path d="M14.2 3.6l6.2 6.2-2.4 2.4-6.2-6.2z" />
    <path d="M12.6 8.2l-7 7v3.2h3.2l7-7" />
    <path d="M5.6 15.2l3.2 3.2" />
  </>,
);

export const Bubbles = make(
  <>
    <circle cx="8.4" cy="14.6" r="4.6" />
    <circle cx="16.4" cy="9.4" r="3.2" />
    <circle cx="17.6" cy="17.4" r="2" />
  </>,
);

export const Target = make(
  <>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </>,
);

export const HairStrands = make(
  <>
    <path d="M4.6 20.4c0-8.6 2.8-15 7.4-15s7.4 6.4 7.4 15" />
    <path d="M8.4 20.4c0-6.4 1.2-10.6 3.6-10.6s3.6 4.2 3.6 10.6" />
  </>,
);

export const Bottle = make(
  <>
    <path d="M10 3.4h4v2.8l1.6 2.2v10.2a2.4 2.4 0 0 1-2.4 2.4h-2.4a2.4 2.4 0 0 1-2.4-2.4V8.4L10 6.2z" />
    <path d="M8.4 11.6h7.2" />
  </>,
);

export const Jar = make(
  <>
    <path d="M6.2 8.4h11.6v9.8a2.4 2.4 0 0 1-2.4 2.4H8.6a2.4 2.4 0 0 1-2.4-2.4z" />
    <path d="M7.6 8.4V6.4a2.4 2.4 0 0 1 2.4-2.4h4a2.4 2.4 0 0 1 2.4 2.4v2" />
  </>,
);

export const Tooth = make(
  <>
    <path d="M7.2 3.4c-2 0-3.2 1.6-3.2 3.8 0 3.5 1.2 6.2 1.9 9.8.4 2 .8 3.6 2.1 3.6 1.5 0 1.6-3.2 2.2-5.2.3-1 .8-1.6 1.2-1.6s.9.6 1.2 1.6c.6 2 .7 5.2 2.2 5.2 1.3 0 1.7-1.6 2.1-3.6.7-3.6 1.9-6.3 1.9-9.8 0-2.2-1.2-3.8-3.2-3.8-1.7 0-2.7.9-4.2.9s-2.5-.9-4.2-.9z" />
  </>,
);

export const Toothpaste = make(
  <>
    <path d="M6 9.4h12v9a2.2 2.2 0 0 1-2.2 2.2H8.2A2.2 2.2 0 0 1 6 18.4z" />
    <path d="M10.4 9.4V6.6h3.2v2.8" />
    <path d="M11.2 3.4h1.6v3.2h-1.6z" />
    <path d="M9 14h6" />
  </>,
);

export const Toothbrush = make(
  <>
    <path d="M4 20l7.4-7.4" />
    <path d="M12.6 4.6l6.8 6.8-3.2 3.2-6.8-6.8z" />
    <path d="M14.4 2.8l1.4 1.4M17 5.4l1.4 1.4M19.6 8l1.4 1.4" />
  </>,
);

export const Leaf = make(
  <>
    <path d="M20.4 3.6C10.8 3.6 4.6 8 4.6 15.4v5" />
    <path d="M4.6 19.4C6.9 11.6 12.8 6.8 20.4 3.6" />
  </>,
);

export const Stethoscope = make(
  <>
    <path d="M6 3.4v5.2a4 4 0 0 0 8 0V3.4" />
    <path d="M4.6 3.4H6M14 3.4h1.4" />
    <path d="M10 12.6v2.2a4.4 4.4 0 0 0 8.8 0v-1.2" />
    <circle cx="18.8" cy="11" r="2.2" />
  </>,
);

export const HeartPulse = make(
  <>
    <path d="M12 20.4l-1.4-1.3C6 14.9 3 12.1 3 8.7 3 6 5.1 3.9 7.8 3.9c1.5 0 3 .7 4.2 2.1 1.2-1.4 2.7-2.1 4.2-2.1C18.9 3.9 21 6 21 8.7c0 3.4-3 6.2-7.6 10.4z" />
    <path d="M5.4 11.4h3.1l1.5-2.4 2.2 4.6 1.5-2.2h4.9" />
  </>,
);

export const BloodDrop = make(
  <>
    <path d="M12 3.4c2.6 3 6 6.7 6 10a6 6 0 1 1-12 0c0-3.3 3.4-7 6-10z" />
    <path d="M12 10.6v5M9.6 13.1h4.8" />
  </>,
);

export const Thermometer = make(
  <>
    <path d="M14.2 14.8V5.4a2.2 2.2 0 1 0-4.4 0v9.4a4.2 4.2 0 1 0 4.4 0z" />
    <path d="M12 17.4v-6" />
  </>,
);

export const Wind = make(
  <>
    <path d="M3.4 8.4h9.4a2.8 2.8 0 1 0-2.8-2.8" />
    <path d="M3.4 12h12.4a2.8 2.8 0 1 1-2.8 2.8" />
    <path d="M3.4 15.8h6.4" />
  </>,
);

export const Bone = make(
  <>
    <path d="M6.8 17.2l10.4-10.4" />
    <path d="M5 13.6a2.6 2.6 0 1 0 3.4 3.4 2.6 2.6 0 1 0-3.4-3.4z" />
    <path d="M15.6 3a2.6 2.6 0 1 0 3.4 3.4A2.6 2.6 0 1 0 15.6 3z" />
  </>,
);

export const Monitor = make(
  <>
    <rect x="3.4" y="4.6" width="17.2" height="12" rx="2.2" />
    <path d="M6.6 10.6h2.6l1.4-2.6 2 5.2 1.4-2.6h3.4" />
    <path d="M9 20.4h6" />
  </>,
);

export const BabyBottle = make(
  <>
    <path d="M9.6 3.4h4.8v2.2l1.4 2v10.8a2.6 2.6 0 0 1-2.6 2.6h-2.4a2.6 2.6 0 0 1-2.6-2.6V7.6l1.4-2z" />
    <path d="M8.2 11.4h7.6" />
    <path d="M11 3.4V2.2h2v1.2" />
  </>,
);

export const Bath = make(
  <>
    <path d="M3.4 12.4h17.2v2.2a4.4 4.4 0 0 1-4.4 4.4H7.8a4.4 4.4 0 0 1-4.4-4.4z" />
    <path d="M6 12.4V6.2a2 2 0 0 1 3.6-1.2" />
    <path d="M6.6 19v1.6M17.4 19v1.6" />
  </>,
);

export const Molecule = make(
  <>
    <circle cx="6" cy="17.4" r="2.6" />
    <circle cx="18" cy="17.4" r="2.6" />
    <circle cx="12" cy="6.6" r="2.6" />
    <path d="M8.2 15.6l2.4-6.6M13.4 9l2.4 6.6M8.6 17.4h6.8" />
  </>,
);

/* -------------------------------- Social --------------------------------- */

export const Award = make(
  <>
    <circle cx="12" cy="9.4" r="5.6" />
    <path d="M8.6 14.2L7.2 21l4.8-2.4L16.8 21l-1.4-6.8" />
    <path d="M12 6.8l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2L9.1 8.9l2-.3z" />
  </>,
);

export const Instagram = make(
  <>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M16.9 7.1h.01" />
  </>,
);

export const Telegram = make(
  <>
    <path d="M20.6 4.4L2.9 11.2l4.8 1.6 1.8 5.6 2.6-3.2 4.4 3.3z" />
    <path d="M7.7 12.8l9.6-6.1-6.2 8" />
  </>,
);

export const Linkedin = make(
  <>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="3.4" />
    <path d="M8 10.6v6" />
    <path d="M8 7.6h.01" />
    <path d="M11.6 16.6v-3.4a2.2 2.2 0 0 1 4.4 0v3.4" />
    <path d="M11.6 10.6v6" />
  </>,
);

export const PlayCircle = make(
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M10.4 9.2l4.6 2.8-4.6 2.8z" />
  </>,
);

/* ------------------------------- registry -------------------------------- */

export const ICONS = {
  search: Search,
  user: User,
  cart: Cart,
  heart: Heart,
  heartFilled: HeartFilled,
  compare: Compare,
  plus: Plus,
  minus: Minus,
  close: Close,
  menu: Menu,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  arrowLeft: ArrowLeft,
  check: Check,
  checkCircle: CheckCircle,
  filter: Filter,
  trash: Trash,
  info: Info,
  alert: Alert,
  logout: Logout,
  truck: Truck,
  shieldCheck: ShieldCheck,
  support: Support,
  return: Return,
  creditCard: CreditCard,
  gift: Gift,
  package: Package,
  tag: Tag,
  flame: Flame,
  sparkles: Sparkles,
  bolt: Bolt,
  trendingUp: TrendingUp,
  star: Star,
  clock: Clock,
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  home: Home,
  journal: Journal,
  grid: Grid,
  dumbbell: Dumbbell,
  shaker: Shaker,
  pill: Pill,
  capsules: Capsules,
  sun: Sun,
  citrus: Citrus,
  fish: Fish,
  flask: Flask,
  flower: Flower,
  teddy: Teddy,
  face: Face,
  droplet: Droplet,
  dropper: Dropper,
  bubbles: Bubbles,
  target: Target,
  hair: HairStrands,
  bottle: Bottle,
  jar: Jar,
  tooth: Tooth,
  toothpaste: Toothpaste,
  toothbrush: Toothbrush,
  leaf: Leaf,
  stethoscope: Stethoscope,
  heartPulse: HeartPulse,
  bloodDrop: BloodDrop,
  thermometer: Thermometer,
  wind: Wind,
  bone: Bone,
  monitor: Monitor,
  babyBottle: BabyBottle,
  bath: Bath,
  molecule: Molecule,
  award: Award,
  instagram: Instagram,
  telegram: Telegram,
  linkedin: Linkedin,
  playCircle: PlayCircle,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const Component = ICONS[name] ?? ICONS.pill;
  return <Component {...rest} />;
}

/** slug → icon mapping for product categories */
export const CATEGORY_ICONS: Record<string, IconName> = {
  "sports-supplements": "dumbbell",
  protein: "shaker",
  creatine: "bolt",
  amino: "molecule",
  "mass-gainer": "trendingUp",
  "pre-workout": "flame",
  vitamins: "pill",
  multivitamin: "capsules",
  "vitamin-d": "sun",
  "vitamin-c": "citrus",
  omega: "fish",
  minerals: "flask",
  "women-supplement": "flower",
  "kids-supplement": "teddy",
  "skin-care": "face",
  sunscreen: "sun",
  moisturizer: "droplet",
  "face-serum": "dropper",
  cleanser: "bubbles",
  "anti-acne": "target",
  "hair-care": "hair",
  shampoo: "bottle",
  "hair-serum": "dropper",
  "anti-hairloss": "shieldCheck",
  "hair-mask": "jar",
  "oral-care": "tooth",
  toothpaste: "toothpaste",
  mouthwash: "leaf",
  toothbrush: "toothbrush",
  "medical-devices": "stethoscope",
  "blood-pressure": "heartPulse",
  glucose: "bloodDrop",
  thermometer: "thermometer",
  nebulizer: "wind",
  orthopedic: "bone",
  oximeter: "monitor",
  "mom-baby": "babyBottle",
  "baby-wash": "bath",
  "baby-skin": "teddy",
  "baby-feeding": "babyBottle",
};

/** slug → icon mapping for magazine categories */
export const BLOG_ICONS: Record<string, IconName> = {
  sports: "dumbbell",
  nutrition: "leaf",
  skin: "face",
  hair: "hair",
  "general-health": "heartPulse",
  vitamins: "pill",
  "mom-baby": "babyBottle",
  devices: "stethoscope",
};

export function CategoryIcon({ slug, ...rest }: { slug: string } & IconProps) {
  return <Icon name={CATEGORY_ICONS[slug] ?? "pill"} {...rest} />;
}

export function BlogIcon({ slug, ...rest }: { slug: string } & IconProps) {
  return <Icon name={BLOG_ICONS[slug] ?? "journal"} {...rest} />;
}
