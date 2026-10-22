type Props = {
  children: React.ReactNode;
  size?: "default" | "wide";
  className?: string;
};

export default function Container({ children, size = "default", className = "" }: Props) {
  const width = size === "wide" ? "max-w-[1680px] lg:px-20" : "max-w-[1120px] md:px-12";
  return <div className={`mx-auto w-full px-4 sm:px-6 ${width} ${className}`}>{children}</div>;
}