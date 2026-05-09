interface GoldDividerProps {
  className?: string
}

export default function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
      <div className="w-1 h-1 rounded-full bg-gold" />
    </div>
  )
}