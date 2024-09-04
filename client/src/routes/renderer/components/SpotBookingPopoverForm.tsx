import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSelect from "../hooks/useSelect";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DialogClose } from "@/components/ui/dialog";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { Timer, Infinity } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import useRenderer from "@/hooks/useRenderer";
import { produce } from "immer";

function SpotBookingPopoverForm() {
  const { selectedObject } = useSelect();
  const { setCurrentParkingLot, currentParkingLot } = useRenderer();
  const focusRef = useRef<HTMLInputElement>(null);

  const [ parkType, setParkType ] = useState<string>("timed");
  const [ parkDate, setParkDate ] = useState<Date | null>(new Date());
  const [ note, setNote ] = useState("");

  // For automatically focusing on an element at start
  // Easier Accessibility
  useEffect(() => {
    if ( focusRef.current ) {
      focusRef.current.focus();
    }
  }, []);

  if ( !selectedObject ) return null;

  const handleParkTimeOptionSelect = (value: string) => setParkType(value);
  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);

  function handleBookParkingSpot() {
    const changedState = produce(currentParkingLot, draft => {
      const parkingSpace = draft?.floors[0].spaces.find(space => space.id === selectedObject?.id);
      if ( parkingSpace ) {
        parkingSpace.bookings.push({
          bookingRefId: "asdawdasd",
          createdOn: new Date(),
          estimatedEndTime: parkType == "infinite" ? undefined : parkDate!,
        });

        // Change Booking status to occupied
        parkingSpace.occupied = true;
      }
    });

    setCurrentParkingLot(changedState);
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col text-xs gap-2">
        <span className="text-xl font-bold">Book a spot</span>
        <hr />
        <div className="grid grid-cols-2 items-center gap-y-3">
          <Label>Parking type</Label>
          <ToggleGroup type="single" onValueChange={handleParkTimeOptionSelect} defaultValue="timed">
            <ToggleGroupItem value="timed" aria-label="Toggle timed">
              <Tooltip>
                <TooltipTrigger>
                  <Timer size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  Timed
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="infinite" aria-label="Toggle indefinite">
              <Tooltip>
                <TooltipTrigger>
                  <Infinity size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  Indefinite
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </ToggleGroup>
          {
            parkType == "timed" && (
              <>
                <Label>Est. park end</Label>
                <Input defaultValue={parkDate?.toISOString().split('.')[0]} onChange={(e) => {
                  setParkDate(new Date(e.target.value));
                }} ref={focusRef} type="datetime-local"></Input>
              </>
            )
          }
          <Label>Note</Label>
          <Textarea className="text-xs text-gray-600" onChange={handleNoteChange} value={note} placeholder="(Optional)" />

        </div>
        <DialogClose asChild>
          <div 
            onClick={handleBookParkingSpot}
            className="bg-blue-500 font-semibold text-white text-md flex items-center justify-center rounded-sm py-2 mt-3 hover:bg-blue-600 cursor-pointer">
            Book spot
          </div>
        </DialogClose>
      </div>
    </TooltipProvider>
  )
}

export default SpotBookingPopoverForm;