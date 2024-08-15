import { ReactNode } from "react";

interface IheaderProps {
  title: string;
  children: ReactNode;
}

export default function Header(props: IheaderProps) {
  const { children, title } = props;

  return (
    <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
      <h3 className="flex items-center space-x-2">
        {children}

        <span>{title}</span>
      </h3>
    </div>
  );
}
