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
        <div className="flex min-w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-1 hover:bg-gray-100">
          <div
            style={{
              backgroundColor: item.color,
            }}
            className={`h-4 w-4 rounded-full ${item.border && "border-2 border-black"}`}
          ></div>
          <span className="text-sm font-light capitalize">
            {item.spaceType}
          </span>
        </div>
        
      ))}
    </>
  )
}
export default EditorAddbarParkingSpaceList