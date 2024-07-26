import applicationLogo from "/logo_main_t.png";

interface LogoProps {
  sizeInRem?: number;
}

export default function Logo({ sizeInRem = 2.5 } : LogoProps) {
  return (
    <img
      style={{
        height: `${sizeInRem}rem`
      }}
      className="z-40 pointer-events-none" src={applicationLogo} alt="Parkrr Logo" />
  )
}