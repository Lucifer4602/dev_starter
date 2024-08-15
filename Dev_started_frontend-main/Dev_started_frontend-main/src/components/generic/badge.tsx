export interface IBadgeProps {
  color: string;
  text: string;
}

export default function Badge(props: IBadgeProps) {
  const { text, color } = props;

  return (
    <div>
      {/* pink */}
      <div
        className={`inline-flex rounded-full bg-${color}-200 px-4 py-1 text-sm font-semibold leading-4 text-${color}-700`}
      >
        {text}
      </div>
    </div>
  );
}
