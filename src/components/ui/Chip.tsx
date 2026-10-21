export default function Chip({ children }: { children: React.ReactNode }) {
  return <span className="glass rounded-full px-3.5 py-1.5 text-sm sm:px-4 sm:text-[15px]">{children}</span>
}