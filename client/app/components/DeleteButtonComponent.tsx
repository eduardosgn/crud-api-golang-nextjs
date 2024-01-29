import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { FiTrash2 } from "react-icons/fi";

interface DeleteButtonComponentProps {
  onDelete: () => void;
  bookTitle: string;
  authorName: string;
  authorSurname: string;
}

export default function DeleteButtonComponent({
  onDelete,
  bookTitle,
  authorName,
  authorSurname,
}: DeleteButtonComponentProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <AlertDialog className="rounded-lg">
              <AlertDialogTrigger asChild>
                <div className="rounded-full bg-white text-red-600 text-2xl p-2 cursor-pointer">
                  <FiTrash2 />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Deletar livro</AlertDialogTitle>
                <AlertDialogDescription>
                  {`Tem certeza de que deseja deletar ${bookTitle} por ${authorName} ${authorSurname}?`}
                </AlertDialogDescription>
                <div className="flex items-center justify-between">
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-red-600 text-white hover:bg-red-800"
                  >
                    <div>Deletar</div>
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-red-600 border-0 text-white">
          <p>Deletar livro</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
