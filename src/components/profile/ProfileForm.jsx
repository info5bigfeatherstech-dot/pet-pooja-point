// src/components/profile/ProfileForm.jsx - Profile edit form using react-hook-form and zod
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormField from "@/components/common/FormField"
import { useUpdateUser } from "@/hooks/useUser"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
})

export function ProfileForm({ user }) {
  const updateUserMutation = useUpdateUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  })

  const onSubmit = async (values) => {
    await updateUserMutation.mutateAsync(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg text-left">
      <FormField label="Full Name" error={errors.name?.message} required>
        <Input
          placeholder="Your full name"
          className="rounded-xl font-subheader text-xs sm:text-sm"
          {...register("name")}
        />
      </FormField>

      <FormField label="Email Address" error={errors.email?.message} required>
        <Input
          type="email"
          placeholder="name@example.com"
          className="rounded-xl font-subheader text-xs sm:text-sm"
          {...register("email")}
        />
      </FormField>

      <FormField label="Mobile Number" error={errors.phone?.message} required>
        <Input
          placeholder="10-digit mobile"
          maxLength={10}
          className="rounded-xl font-subheader text-xs sm:text-sm"
          {...register("phone")}
        />
      </FormField>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={!isDirty || updateUserMutation.isPending}
          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-medium text-xs sm:text-sm px-6 h-10"
        >
          {updateUserMutation.isPending ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving Changes...
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
