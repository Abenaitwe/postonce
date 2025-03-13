
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Post-Bridge has completely transformed how I share content with my audience. Now I can connect all my platforms with just one link!",
    author: "Alex Morgan",
    role: "Content Creator",
    avatar: "AM"
  },
  {
    quote: "As a social media manager, Post-Bridge has saved me hours of work. My clients love the clean professional look of their link pages.",
    author: "Sarah Johnson",
    role: "Digital Marketer",
    avatar: "SJ"
  },
  {
    quote: "The simplicity and elegance of Post-Bridge is unmatched. It took me less than 5 minutes to set up my page and start sharing it.",
    author: "David Chen",
    role: "Photographer",
    avatar: "DC"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 font-bold text-gray-900">Loved by creators everywhere</h2>
          <p className="text-xl text-gray-600">
            Join thousands of creators who are using Post-Bridge to grow their audience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-100">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <svg
                    className="h-8 w-8 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" alt={testimonial.author} />
                    <AvatarFallback className="bg-postbridge-100 text-postbridge-800">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
