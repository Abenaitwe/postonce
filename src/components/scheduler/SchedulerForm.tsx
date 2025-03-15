
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, ImageIcon, Loader2, Send } from "lucide-react";
import PlatformSelector from "./PlatformSelector";

// Define the form schema with Zod
const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
  scheduledDate: z.date({
    required_error: "Please select a date to schedule",
  }),
  scheduledTime: z.string({
    required_error: "Please select a time to schedule",
  }),
  mediaUrl: z.string().optional(),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
});

type FormValues = z.infer<typeof formSchema>;

const SchedulerForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      scheduledTime: "12:00",
      platforms: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
      
      // No need to set the URL in the form as we'll handle the file upload separately
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      console.log("Submitting post:", {
        ...data,
        file: selectedFile ? selectedFile.name : "No file attached",
      });
      
      // Show success message
      toast({
        title: "Post scheduled successfully!",
        description: `Your post has been scheduled for ${format(data.scheduledDate, "PPP")} at ${data.scheduledTime}.`,
      });
      
      // Reset form
      form.reset();
      setSelectedFile(null);
      setFilePreview(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Social Media Platforms */}
          <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Platforms</FormLabel>
                <FormControl>
                  <PlatformSelector 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Choose which platforms you want to post to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Post Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What would you like to share?"
                    className="min-h-[120px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Media Upload */}
          <div className="space-y-2">
            <FormLabel>Media (optional)</FormLabel>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-24 w-full justify-start gap-2"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <ImageIcon className="h-5 w-5" />
                {selectedFile ? selectedFile.name : "Upload image or video"}
              </Button>
              {filePreview && (
                <div className="relative h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                  <img 
                    src={filePreview} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <FormField
              control={form.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Post Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Picker */}
            <FormField
              control={form.control}
              name="scheduledTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <React.Fragment key={hour}>
                          <SelectItem value={`${hour.toString().padStart(2, "0")}:00`}>
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                          <SelectItem value={`${hour.toString().padStart(2, "0")}:30`}>
                            {`${hour.toString().padStart(2, "0")}:30`}
                          </SelectItem>
                        </React.Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Schedule Post
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SchedulerForm;
