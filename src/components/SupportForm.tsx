import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  requestType: string;
  briefDescription: string;
  detailedDescription: string;
}

const requestTypes = [
  "Technical Issue",
  "Account Access",
  "Billing Question",
  "Feature Request",
  "Other",
];

export function SupportForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", { ...data, file: selectedFile });
      
      toast({
        title: "Success!",
        description: "Your support request has been submitted successfully.",
      });
      
      reset();
      setSelectedFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">EKIS Cyber Support Request</h1>
        <p className="text-gray-500">
          Por favor, rellene el formulario con toda la información disponible.
          Las capturas de pantalla, los vídeos o cualquier otro detalle adicional
          que pueda proporcionarnos serán de gran ayuda para comprender y
          resolver su problema con rapidez.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">
              Nombre Completo<span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              className="mt-1"
              placeholder="Escribe texto"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1"
              placeholder="Escribe el correo"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">
              Teléfono<span className="text-red-500">*</span>
            </Label>
            <div className="flex mt-1">
              <select className="w-[100px] rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background">
                <option value="us">🇺🇸 +1</option>
              </select>
              <Input
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                className="rounded-l-none"
                placeholder="Escribe tu teléfono"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="requestType">
              Tipo de Requerimiento<span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar opción..." />
              </SelectTrigger>
              <SelectContent>
                {requestTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="briefDescription">
              ¿Cómo podemos ayudar?<span className="text-red-500">*</span>
            </Label>
            <Input
              id="briefDescription"
              {...register("briefDescription", { required: "Brief description is required" })}
              className="mt-1"
              placeholder="Enter a brief description of your request"
            />
            {errors.briefDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.briefDescription.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="detailedDescription">
              Compártenos toda la información acerca de su problema
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="detailedDescription"
              {...register("detailedDescription", { required: "Detailed description is required" })}
              className="mt-1"
              placeholder="Escribe texto"
              rows={4}
            />
            {errors.detailedDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.detailedDescription.message}
              </p>
            )}
          </div>

          <div>
            <Label>
              Por favor, suba capturas de pantalla o vídeos que evidencien el problema.
            </Label>
            <div className="mt-1">
              <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Suelta los archivos aquí para subirlos</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}