// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Trash2, Loader2 } from 'lucide-react'

// interface Props {
//   id:       string
//   resource: string
//   label:    string
// }

// export default function AdminDeleteButton({ id, resource, label }: Props) {
//   const [loading,  setLoading]  = useState(false)
//   const [confirm,  setConfirm]  = useState(false)
//   const router = useRouter()

//   const handleDelete = async () => {
//     setLoading(true)
//     try {
//       const res = await fetch(`/api/${resource}/${id}`, { method: 'DELETE' })
//       if (res.ok) {
//         router.refresh()
//       } else {
//         const data = await res.json()
//         alert(data.message || 'Delete failed')
//       }
//     } catch {
//       alert('Network error')
//     } finally {
//       setLoading(false)
//       setConfirm(false)
//     }
//   }

//   if (confirm) {
//     return (
//       <div className="flex items-center gap-1">
//         <button onClick={handleDelete} disabled={loading}
//                 className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50 transition-colors">
//           {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Yes'}
//         </button>
//         <button onClick={() => setConfirm(false)}
//                 className="px-2 py-1 bg-stone-200 text-stone-700 text-xs rounded hover:bg-stone-300 transition-colors">
//           No
//         </button>
//       </div>
//     )
//   }

//   return (
//     <button
//       onClick={() => setConfirm(true)}
//       className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
//       title={`Delete ${label}`}
//     >
//       <Trash2 className="w-4 h-4" />
//     </button>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Trash2,
  Loader2,
} from 'lucide-react'

import { toast } from 'sonner'

interface Props {
  id: string
  resource: string
  label: string
}

export default function AdminDeleteButton({
  id,
  resource,
  label,
}: Props) {
  const [loading, setLoading] =
    useState(false)

  const [confirm, setConfirm] =
    useState(false)

  const router = useRouter()

  const handleDelete =
    async () => {
      setLoading(true)

      try {
        const res = await fetch(
          `/api/${resource}/${id}`,
          {
            method: 'DELETE',
          }
        )

        const data =
          await res.json()

        if (res.ok) {
          toast.success(
            `${label} deleted successfully`
          )

          router.refresh()
        } else {
          toast.error(
            data.message ||
              'Delete failed'
          )
        }
      } catch {
        toast.error(
          'Network error'
        )
      } finally {
        setLoading(false)
        setConfirm(false)
      }
    }

  if (confirm) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            'Yes'
          )}
        </button>

        <button
          onClick={() =>
            setConfirm(false)
          }
          className="px-2 py-1 bg-stone-200 text-stone-700 text-xs rounded hover:bg-stone-300 transition-colors"
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() =>
        setConfirm(true)
      }
      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
      title={`Delete ${label}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}