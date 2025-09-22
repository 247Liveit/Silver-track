import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "./use-toast"


// const StyledViewport = styled(Toast.Viewport)`
//   position: fixed;
//   bottom: 10px;
//   right: 10px;
//   /* You can adjust the position as needed, e.g., top, left, etc. */
//   z-index: 9999;
// `;

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider  >
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="shadow-lg pointer-events-auto">
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport style={{position:"fixed",bottom:"10px"}}   />
    </ToastProvider>
  )
}
