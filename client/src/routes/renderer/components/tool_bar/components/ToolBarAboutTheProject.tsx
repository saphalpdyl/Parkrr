import { BadgeHelp } from "lucide-react";
import ToolBarItem from "../ToolBarItem";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function ToolBarAboutTheProject() {
  return (
    <Dialog>
      <DialogTrigger>
        <ToolBarItem tooltip="About the project" icon={BadgeHelp} color="gray" onClick={() => {}}/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About the project</DialogTitle>
          <DialogDescription>
            <br />
            Hi, I'm Saphal Poudyal, a developer and a student, pursing further studies as an undergraduate.
            Parkrr was a project developed to test out React Three Fiber(R3F) and it came to become what it is today.
            <br />
            <br />
            Parkrr is not meant to be used for commercial purposes. However, the code is free for anyone to reuse and resell under the MIT license.
            <br />
            <br />
            <strong>Made with ❤️  by saphalpdyl | Copyright © 2024</strong>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default ToolBarAboutTheProject;
