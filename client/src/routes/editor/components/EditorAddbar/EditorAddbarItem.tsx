type EditorAddbarItemProps = {
  children: React.ReactNode;
  title: string;
}
function EditorAddbarItem({ children, title }: EditorAddbarItemProps) {
  return (
    <div className="flex min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-1 hover:bg-gray-100 group/baritem">
      { children }
      <span className="text-xs font-medium capitalize">
        {title}
      </span>
    </div>
  )
}

export default EditorAddbarItem;