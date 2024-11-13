import { Button } from "@mui/material";
import { toast, ToastOptions } from "react-toastify";

interface ConfirmToastProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  toastOptions?: Partial<ToastOptions>;
}

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  hideProgressBar: false,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  autoClose: false,
  closeOnClick: false,
  closeButton: false,
};

const ConfirmToast = ({
  message,
  confirmText = "확인",
  cancelText = "취소",
  toastOptions = {},
}: ConfirmToastProps): Promise<boolean> => {
  return new Promise((resolve) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-medium">{message}</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              onClick={() => {
                resolve(false);
                closeToast?.();
              }}
            >
              {cancelText}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                resolve(true);
                closeToast?.();
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      ),
      {
        ...defaultToastOptions,
        ...toastOptions,
      }
    );
  });
};

export default ConfirmToast;
