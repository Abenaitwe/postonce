
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "1 custom link page",
      "5 social links",
      "Basic analytics",
      "Mobile-responsive design",
      "Post-Bridge branding"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Everything you need to grow",
    features: [
      "Multiple link pages",
      "Unlimited social links",
      "Advanced analytics",
      "Custom domain",
      "Remove Post-Bridge branding",
      "Priority support"
    ],
    cta: "Get Pro",
    popular: true
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For teams and businesses",
    features: [
      "Team collaboration",
      "Multiple users",
      "Branded link pages",
      "API access",
      "Advanced integrations",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 font-bold text-gray-900">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for you and start connecting with your audience today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border ${plan.popular ? 'border-postbridge-400 shadow-lg' : 'border-gray-200'} relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-3 mr-3">
                  <span className="bg-postbridge-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-gray-500">{plan.period}</span>
                  )}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-postbridge-600 hover:bg-postbridge-700' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
