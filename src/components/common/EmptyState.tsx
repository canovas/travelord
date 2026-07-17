type EmptyStateProps = {
  title: string
}

export function EmptyState({ title }: EmptyStateProps) {
  return <p className="text-slate-500">{title}</p>
}
