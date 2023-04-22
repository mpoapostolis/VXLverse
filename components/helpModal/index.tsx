import { HelpCircleIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger className="fixed z-50 right-4 bottom-4 bg-black bg-opacity-30 rounded-full ">
        <HelpCircleIcon className="h-10 w-10" />
      </DialogTrigger>
      <DialogContent className=" bg-background   border-none shadow-none max-w-md">
        <div className="bg-gradient-to-br    shadow-md  mx-auto  text-foreground">
          <h2 className="text-2xl font-bold mb-4 text-left">Master the Art of Control</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-lg font-semibold mr-2">1.</div>
              <div>
                <h3 className="font-semibold">Guiding Your Character:</h3>
                <p>
                  Left-click on any location to command your character to move with precision and purpose through the
                  world.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-lg font-semibold mr-2">2.</div>
              <div>
                <h3 className="font-semibold">Unleash Your Agility:</h3>
                <p>
                  Hold the Shift key while moving to accelerate your character s pace, swiftly traversing the land with
                  grace and power.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-lg font-semibold mr-2">3.</div>
              <div>
                <h3 className="font-semibold">Embrace Interaction:</h3>
                <p>
                  Left-click on objects, fellow characters, or items to initiate interaction, engage in combat, or
                  secure valuable assets for your inventory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
