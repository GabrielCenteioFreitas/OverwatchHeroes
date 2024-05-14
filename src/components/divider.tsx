import { twMerge } from 'tailwind-merge'

const Divider = ({ className }: { className?: string }) => {
  return <div className={twMerge("w-full h-px bg-slate-400", className)} />;
}
 
export default Divider;