type Props = {
  children: React.ReactNode;
  size?: "default" | "medium" | "wide";
  className?: string;
};

const widths = {
  default: "max-w-[1120px] md:px-12",
  medium: "max-w-[1280px] md:px-12",
  wide: "max-w-[1680px] lg:px-10",
};

export default function Container({ children, size = "default", className = "" }: Props) {
  return <div className={`mx-auto w-full px-4 sm:px-6 ${widths[size]} ${className}`}>{children}</div>;
}