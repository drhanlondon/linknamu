type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl border-2 border-gray-900 bg-white px-5 py-4 font-medium transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-gray-100 dark:bg-gray-900"
    >
      <span>{title}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{count.toLocaleString()}회</span>
    </a>
  );
}
