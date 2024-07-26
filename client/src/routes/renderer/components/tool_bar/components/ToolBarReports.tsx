import { SquareKanban } from "lucide-react";
import ToolBarItem from "../ToolBarItem";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useRenderer from "@/hooks/useRenderer";
import { IParkingSpace } from "@/types/parking";

function ToolBarReports() {
  const { currentParkingLot } = useRenderer();

  const parkingLotSpaces = currentParkingLot?.floors[0].spaces;

  if ( !parkingLotSpaces ) return;
  
  const parkingLotSpacesRows = [];
  // @ts-ignore
  const groupedSpaces = Object.groupBy(parkingLotSpaces, (item: IParkingSpace) => item.type); 
  for( const space in groupedSpaces ) {
    const occupiedSpaces = groupedSpaces[space].filter((item: IParkingSpace) => item.occupied).length;
    const notOccupiedSpaces = groupedSpaces[space].filter((item: IParkingSpace) => !item.occupied).length;
    parkingLotSpacesRows.push(
      <TableRow>
        <TableCell>
          <span className="uppercase font-bold">{ space }</span>
        </TableCell>
        <TableCell>
          <div className="flex flex-col justify-between">
            <span className="text-green-500">Occupied: {occupiedSpaces}/{occupiedSpaces + notOccupiedSpaces}</span>
            <span className="text-gray-500">Empty: {notOccupiedSpaces}/{occupiedSpaces + notOccupiedSpaces}</span>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <ToolBarItem tooltip="View Reports" icon={SquareKanban} color="teal" onClick={() => {}}/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parking Lot Report</DialogTitle>
          <DialogDescription>
            <Table>
              <TableCaption>Viewing "{currentParkingLot?.name ?? "Untitled"}" parking lot.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Space Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  parkingLotSpacesRows
                }
              </TableBody>
            </Table>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ToolBarReports;
