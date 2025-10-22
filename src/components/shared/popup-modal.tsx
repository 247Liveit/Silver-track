import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Plus } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { useModalHook } from '@/providers/modalContext';
import { useAuthHook } from '@/providers/authContext';
import useAccessControl from '@/rbac/use-access-control';
import { Action } from '@/rbac/aceess-rules';

type TPopupModalProps = {
  onConfirm?: () => void;
  loading?: boolean;
  modalName?: string;
  showAddBtn?: boolean
  title?: string
  userPopup?: boolean
  renderModal: (onClose: () => void) => React.ReactNode;
  extraBtns?: () => React.ReactNode;
  url?: string
};
export default function PopupModal({ renderModal, modalName, showAddBtn = true, title, userPopup = false, extraBtns,url }: TPopupModalProps) {
  const { isOpen, setIsOpen } = useModalHook();
  const onClose = () => {
    setIsOpen("");
  }


  const { isAllowed, getResourceByUrl } = useAccessControl();

  const isAllowedCreate = isAllowed(Action.Create, getResourceByUrl(url??'/invoices'))
  console.log("isAllowedCreate", isAllowedCreate);
  return (
    <div className="flex justify-end">
      <div className="flex gap-2">
        {showAddBtn && isAllowedCreate &&
          <Button className="flex justify-end ml-auto  text-xs md:text-sm " onClick={() => setIsOpen(modalName ?? "create")}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        }
        {extraBtns && extraBtns()}
      </div>
      <Modal
        userPopup={userPopup}
        isOpen={isOpen === (modalName ?? "create")}
        onClose={onClose}
        className={'!bg-background !px-1 w-full lg:w-[85%]'}
      >
        <h5 className='text-2xl font-bold px-10'>{title ?? "Add Client"}</h5>
        <ScrollArea className="px-6">
          {renderModal(onClose)}
        </ScrollArea>
      </Modal>
    </div>
  );
}
