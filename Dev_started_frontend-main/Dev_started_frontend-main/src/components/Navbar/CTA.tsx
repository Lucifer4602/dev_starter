import Link from "next/link";

const blackModeColor =
  "text-white bg-[#0077B6] hover:bg-opacity-95 focus:bg-opacity-95";

const whiteModeColor =
  "text-gray-950 bg-white hover:bg-gray-100 focus:bg-white";

export default function CTA({
  href = "/login",
  title = "Login",
  ctaText = "Login",
  className = "",
  blackTheme = true,
}) {
  return (
    <Link
      href={href}
      title={title}
      className={`inline-flex shadow items-center justify-center rounded px-5 py-3 text-base font-semibold transition-all duration-200 ${
        !blackTheme ? whiteModeColor : blackModeColor
      } ${className}`}
      role="button"
    >
      {ctaText}
    </Link>
  );
}
