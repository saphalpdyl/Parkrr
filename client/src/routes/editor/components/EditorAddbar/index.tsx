import EditorAddbarParkingSpaceList from "./EditorAddbarParkingSpaceList";

function EditorAddBar() {
  return (
    <div className="group fixed bottom-0 z-20 flex h-40 w-1/2 items-end">
      <div className="flex h-16 w-full translate-y-8 divide-x-2 rounded-t-lg bg-white px-6 py-2 opacity-50 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-[3] justify-evenly">
          <EditorAddbarParkingSpaceList />
        </div>
        <div className="flex-[4]"></div>
      </div>
    </div>
  );
}

export default EditorAddBar;
