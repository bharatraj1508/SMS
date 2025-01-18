"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "../InputField";
import { Input } from "@/components/ui/input";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  sex: z.enum(["male", "female", "others"], { message: "Sex is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function ParentForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((formData) => {
    // const fullData = { ...formData, sex };
    console.log(formData);
  });

  return (
    <form
      className="flex flex-col gap-8 h-[300px] w-[80vw] md:w-full lg:h-[500px] overflow-scroll"
      onSubmit={onSubmit}
    >
      <h1 className="text-base lg:text-xl font-semibold">
        {type === "create" ? "Create" : "Update"} parent
      </h1>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-gray-400 font-medium">
          Authentication Information
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
          />
          <InputField
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
            register={register}
            error={errors?.password}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-xs text-gray-400 font-medium">
          Personal Information
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            defaultValue={data?.firstName}
            register={register}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            defaultValue={data?.lastName}
            register={register}
            error={errors.lastName}
          />
          <div className="flex flex-col gap-2">
            {/* <Select onValueChange={setSex} value={sex}>
              <SelectTrigger>
                <SelectValue placeholder="Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select> */}
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("sex")}
              defaultValue={data?.sex || ""}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {errors.sex?.message && (
              <p className="text-xs text-red-400">
                {errors.sex.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-xs text-gray-400 font-medium">
          Contact Information
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors.phone}
          />
          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors.address}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-xs text-gray-400 font-medium">
          Upload a picture
        </span>
        <div className="grid grid-cols-3 gap-4">
          <Input id="picture" type="file" />
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
