import { Description, Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel } : ConfirmDialogProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onCancel}>
                <Transition
                    show={isOpen}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-0 scale-95"
                    as={Fragment}
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <DialogTitle className="text-lg font-semibold text-gray-900">
                            {title}
                        </DialogTitle>
                        <Description className="mt-2 text-sm text-gray-600">
                            {message}
                        </Description>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={onCancel} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                                No
                            </button>
                            <button onClick={onConfirm} className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">
                                Yes
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </Transition>

    );
}
export default ConfirmDialog;