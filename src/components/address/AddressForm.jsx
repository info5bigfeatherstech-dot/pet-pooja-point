// src/components/address/AddressForm.jsx - Address creation and editing form with zod validation
import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import FormField from "@/components/common/FormField"

const addressSchema = z.object({
  label: z.enum(["home", "work", "other"], {
    required_error: "Please select an address label",
  }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  line1: z.string().min(3, "House / Flat / Building is required"),
  line2: z.string().optional().default(""),
  landmark: z.string().optional().default(""),
  city: z.string().min(2, "City is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  isDefault: z.boolean().default(false),
})

export function AddressForm({
  initialValues = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: initialValues?.label || "home",
      name: initialValues?.name || "",
      phone: initialValues?.phone || "",
      line1: initialValues?.line1 || "",
      line2: initialValues?.line2 || "",
      landmark: initialValues?.landmark || "",
      city: initialValues?.city || "Bengaluru",
      pincode: initialValues?.pincode || "",
      isDefault: initialValues?.isDefault || false,
    },
  })

  const currentLabel = watch("label")
  const currentIsDefault = watch("isDefault")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      {/* Label Radio Group */}
      <div className="space-y-2">
        <Label className="text-xs sm:text-sm font-medium text-foreground">
          Address Type
        </Label>
        <RadioGroup
          value={currentLabel}
          onValueChange={(val) => setValue("label", val)}
          className="flex items-center gap-4 pt-1"
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="home" id="label-home" />
            <Label htmlFor="label-home" className="cursor-pointer font-medium text-xs sm:text-sm">
              Home
            </Label>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="work" id="label-work" />
            <Label htmlFor="label-work" className="cursor-pointer font-medium text-xs sm:text-sm">
              Work
            </Label>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="other" id="label-other" />
            <Label htmlFor="label-other" className="cursor-pointer font-medium text-xs sm:text-sm">
              Other
            </Label>
          </div>
        </RadioGroup>
        {errors.label && (
          <p className="text-xs font-medium text-destructive">{errors.label.message}</p>
        )}
      </div>

      {/* Name & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormField label="Receiver Name" error={errors.name?.message} required>
          <Input
            placeholder="e.g. Aarav Sharma"
            className="rounded-xl font-subheader text-xs sm:text-sm"
            {...register("name")}
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
      </div>

      {/* Line 1 */}
      <FormField label="Flat, House no., Building" error={errors.line1?.message} required>
        <Input
          placeholder="e.g. Flat 402, Signature Tower B"
          className="rounded-xl font-subheader text-xs sm:text-sm"
          {...register("line1")}
        />
      </FormField>

      {/* Line 2 */}
      <FormField label="Area, Street, Sector" error={errors.line2?.message}>
        <Input
          placeholder="e.g. Green Glen Layout, Bellandur"
          className="rounded-xl font-subheader text-xs sm:text-sm"
          {...register("line2")}
        />
      </FormField>

      {/* Landmark */}
      <FormField label="Landmark (Optional)" error={errors.landmark?.message}>
        <Input
          placeholder="e.g. Near EcoSpace Tech Park"
          className="rounded-xl font-subheader text-xs sm:text-sm"
          {...register("landmark")}
        />
      </FormField>

      {/* City & Pincode Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormField label="City" error={errors.city?.message} required>
          <Input
            placeholder="City"
            className="rounded-xl font-subheader text-xs sm:text-sm"
            {...register("city")}
          />
        </FormField>

        <FormField label="6-Digit Pincode" error={errors.pincode?.message} required>
          <Input
            placeholder="e.g. 560103"
            maxLength={6}
            className="rounded-xl font-subheader text-xs sm:text-sm"
            {...register("pincode")}
          />
        </FormField>
      </div>

      {/* Default Switch */}
      <div className="flex items-center justify-between pt-2 pb-2 border-t border-border">
        <div>
          <Label htmlFor="default-switch" className="text-xs sm:text-sm font-medium cursor-pointer">
            Make this my default address
          </Label>
          <p className="text-[11px] text-muted-foreground font-subheader">
            This address will be automatically selected for your deliveries.
          </p>
        </div>
        <Switch
          id="default-switch"
          checked={currentIsDefault}
          onCheckedChange={(checked) => setValue("isDefault", checked)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl font-medium text-xs sm:text-sm"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-medium text-xs sm:text-sm px-5"
        >
          {isLoading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : initialValues?.id ? (
            "Update Address"
          ) : (
            "Save Address"
          )}
        </Button>
      </div>
    </form>
  )
}

export default AddressForm
