interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toolbar = ({ children }: ToolbarProps) => {
  return <div className="mb-4 flex w-full items-center rounded-md bg-muted p-2">{children}</div>;
};

export default Toolbar;
