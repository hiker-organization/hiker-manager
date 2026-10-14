import { toast } from 'vue3-toastify'

export function useToast() {
  const notify = toast

  return {
    notify,
  }
}
