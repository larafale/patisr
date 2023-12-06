import wretch from "wretch"
import { toast } from "sonner"

const api = wretch("/api")

export default api

export  const apiError = (err: any) => {
    const errors: any[] = Array.isArray(err.json) ? err.json : [err.json]
    errors.map(e => {
        const field = e?.path?.[0] || ""
        const message = field ? `${field} - ${e.message}` : e.message
        toast.error(message)
    })
}
