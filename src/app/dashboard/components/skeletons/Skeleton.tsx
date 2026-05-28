interface SkeletonProps {
  readonly className?: string
  readonly animate?: boolean
  readonly style?: React.CSSProperties
}

export function Skeleton({ className, animate = true, style }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 rounded ${animate ? "animate-pulse" : ""} ${className || ""}`}
      style={style}
    />
  )
}
