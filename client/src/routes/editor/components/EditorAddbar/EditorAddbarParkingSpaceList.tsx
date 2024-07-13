import { ParkingSpaceType } from "../../../../types/parking";

const bottomNavigationBarParkingSpaces: {
  spaceType: ParkingSpaceType;
  color: string;
  border?: boolean;
}[] = [
  {
    spaceType: "standard",
    color: "#fff",
    border: true,
  },
  {
    spaceType: "electric",
    color: "#00917c",
  },
  {
    spaceType: "handicap",
    color: "#1d63dc",
  },
  {
    spaceType: "vip",
    color: "#ab2330",
  },
];

function EditorAddbarParkingSpaceList() {
  return (
    <>
      {bottomNavigationBarParkingSpaces.map((item) => (
        <div className="flex min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-1 hover:bg-gray-100 group/baritem">
          <div
            style={{
              backgroundColor: item.color,
            }}
            className={`h-4 w-4 rounded-full group-hover/baritem:-translate-y-3 translate-y-0 transition-all transform-gpu ${item.border && "border-2 border-black"} ring-2 ring-offset-1 ring-slate-200 group-hover/baritem:ring-transparent`}
          ></div>
          <span className="text-xs font-medium capitalize">
            {item.spaceType}
          </span>
        </div>
        
      ))}
    </>
  )
}
export default EditorAddbarParkingSpaceList