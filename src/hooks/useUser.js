// src/hooks/useUser.js - TanStack Query hooks for fetching and updating user profile
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getUser, updateUser } from "@/api/userApi"

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser)
      toast.success("Profile updated successfully!")
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile.")
    },
  })
}

export default useUser
