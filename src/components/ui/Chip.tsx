export default function Chip({ children }: { children: React.ReactNode }) {
  return <span className="glass rounded-full px-4 py-1.5 text-[15px]">{children}</span>;
}