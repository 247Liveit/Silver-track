'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Sheet,/*  SheetClose, */ SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, /* SheetTrigger */ } from './sheet';
import { ScrollArea } from './scroll-area';
// import { Button } from './button';
// import { Label } from './label';
// import { Input } from './input';

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  allowDismissal?: boolean;
  userPopup?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  allowDismissal = true,
  userPopup = false
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!userPopup)
    return (
      <Sheet open={isOpen} onOpenChange={onChange} >
        <SheetContent className={" w-[1000px] sm:w-[700px] max-w-md  lg:max-w-3xl" + " " + className} onPointerDownOutside={allowDismissal ? () => { } : (e) => e.preventDefault()}>
          <SheetHeader>
            <SheetTitle className='ml-4'>{title}</SheetTitle>
            <SheetDescription>
              {description}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="px-6">

            <div>{children}</div>
          </ScrollArea>
          <SheetFooter>
            {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  return (
    <Dialog open={isOpen} onOpenChange={onChange}  >
      <DialogContent className={className} onPointerDownOutside={allowDismissal ? () => { } : (e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
