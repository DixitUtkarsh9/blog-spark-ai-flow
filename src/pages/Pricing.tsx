import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
const Pricing = () => {
  // Toast for notifications
  const {
    toast
  } = useToast();

  // Demo animation state
  const [isPlaying, setIsPlaying] = useState(false);

  // Pricing tiers
  const pricingTiers = [{
    name: 'Free',
    description: 'Perfect for trying out our service',
    price: {
      monthly: '$0',
      weekly: '$0'
    },
    features: [{
      name: '1 blog post demo',
      included: true
    }, {
      name: 'LinkedIn publishing',
      included: true
    }, {
      name: 'Gmail approval flow',
      included: true
    }, {
      name: 'SEO optimization',
      included: true
    }, {
      name: 'Priority support',
      included: false
    }, {
      name: 'Custom branding',
      included: false
    }],
    cta: 'Try for free',
    popular: false,
    ctaLink: '/demo',
    gradient: 'from-muted/40 to-muted/20'
  }, {
    name: 'Starter',
    description: 'Best for individuals and small businesses',
    price: {
      monthly: '$89',
      weekly: '$25'
    },
    features: [{
      name: '2 blogs per day',
      included: true
    }, {
      name: 'LinkedIn publishing',
      included: true
    }, {
      name: 'Gmail approval flow',
      included: true
    }, {
      name: 'SEO optimization',
      included: true
    }, {
      name: 'Priority support',
      included: true
    }, {
      name: 'Custom branding',
      included: false
    }],
    cta: 'Get started',
    popular: true,
    ctaLink: '/demo',
    gradient: 'from-primary/80 to-secondary/80'
  }, {
    name: 'Intermediate',
    description: 'For growing businesses needing more content',
    price: {
      monthly: '$249',
      weekly: '$67'
    },
    features: [{
      name: '4 blogs per day',
      included: true
    }, {
      name: 'LinkedIn publishing',
      included: true
    }, {
      name: 'Gmail approval flow',
      included: true
    }, {
      name: 'SEO optimization',
      included: true
    }, {
      name: 'Priority support',
      included: true
    }, {
      name: 'Custom branding',
      included: true
    }],
    cta: 'Get started',
    popular: false,
    ctaLink: '/demo',
    gradient: 'from-neon-blue/50 to-neon-purple/50'
  }, {
    name: 'Enterprise',
    description: 'For large teams with high volume needs',
    price: {
      monthly: 'Custom',
      weekly: 'Custom'
    },
    features: [{
      name: 'Unlimited blogs',
      included: true
    }, {
      name: 'LinkedIn publishing',
      included: true
    }, {
      name: 'Gmail approval flow',
      included: true
    }, {
      name: 'SEO optimization',
      included: true
    }, {
      name: 'Priority support',
      included: true
    }, {
      name: 'Custom branding',
      included: true
    }, {
      name: 'API access',
      included: true
    }, {
      name: 'Custom integrations',
      included: true
    }],
    cta: 'Contact us',
    popular: false,
    ctaLink: '/contact',
    gradient: 'from-muted/40 to-muted/20'
  }];

  // Billing toggle
  const [billing, setBilling] = React.useState<'monthly' | 'weekly'>('weekly');

  // Demo animation frames
  const demoSteps = [{
    title: "Keyword Research",
    description: "Our AI identifies high-value keywords and analyzes search intent.",
    image: "/demo-step1.png"
  }, {
    title: "Content Creation",
    description: "AI generates a comprehensive blog post optimized for SEO.",
    image: "/demo-step2.png"
  }, {
    title: "Review & Approve",
    description: "Review the content via email and request any changes.",
    image: "/demo-step3.png"
  }, {
    title: "Publish to LinkedIn",
    description: "Approved content is automatically formatted and published.",
    image: "/demo-step4.png"
  }];

  // Waitlist form validation schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters."
    }),
    email: z.string().email({
      message: "Please enter a valid email address."
    }),
    company: z.string().optional()
  });

  // Form handling
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: ""
    }
  });
  const onSubmitWaitlist = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Added to waitlist!",
      description: "We'll notify you when we launch."
    });
    form.reset();
  };

  // Toggle demo animation playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  return <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
        
        <div className="container flex flex-col items-center text-center py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl animate-fade-in">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl animate-fade-in" style={{
          animationDelay: '100ms'
        }}>
            Choose the plan that&apos;s right for your content needs, with no hidden fees.
          </p>
          
          {/* Billing toggle */}
          <div className="mt-10 flex items-center gap-4 p-1 rounded-lg bg-muted/20 animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            <button className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors", billing === 'monthly' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50")} onClick={() => setBilling('monthly')}>
              Monthly billing
            </button>
            <button className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors", billing === 'weekly' ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50")} onClick={() => setBilling('weekly')}>
              Weekly billing
              <span className="ml-1.5 inline-block py-0.5 px-1.5 text-xs rounded-full bg-primary/20 text-foreground">
                Save 12%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      
      
      {/* Demo Preview Section with Interactive Animation */}
      <section className="py-16 sm:py-20 bg-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent -z-10"></div>
        
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">
              See the Blog Writer in Action
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{
            animationDelay: '100ms'
          }}>
              Watch our AI transform a simple topic into a fully-optimized blog post in real-time.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden glass-card p-4 animate-fade-in" style={{
            animationDelay: '200ms'
          }}>
              <div className="relative">
                <Carousel className="w-full" autoPlay={isPlaying} loop={true}>
                  <CarouselContent>
                    {demoSteps.map((step, index) => <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="flex flex-col rounded-lg overflow-hidden">
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <div className="text-center p-8">
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                              </div>
                            </div>
                            <div className="p-4 bg-muted/20">
                              <p className="text-sm text-center">
                                Step {index + 1} of {demoSteps.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>)}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="icon" onClick={togglePlayback} className="rounded-full h-12 w-12">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center animate-fade-in" style={{
            animationDelay: '300ms'
          }}>
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/demo">Try it yourself</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-muted/10">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{
            animationDelay: '100ms'
          }}>
              Got questions? We&apos;ve got answers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {[{
            question: 'How does the free trial work?',
            answer: 'The free trial lets you experience the full process of creating one blog post using our platform. You\'ll see every step from keyword research to LinkedIn publishing.'
          }, {
            question: 'When will the paid plans be available?',
            answer: 'We\'re currently in beta, and paid plans will be available soon. Join our waitlist to get early access and special launch pricing.'
          }, {
            question: 'How is content quality ensured?',
            answer: 'Our AI utilizes advanced models to ensure high-quality content. Additionally, the approval process via Gmail gives you full control to request changes before publishing.'
          }, {
            question: 'Do I need a LinkedIn account to use the service?',
            answer: 'For the LinkedIn publishing feature, you\'ll need a LinkedIn account. However, you can still use our service to create content without the auto-publishing feature.'
          }, {
            question: 'What happens if I need more blogs than my plan allows?',
            answer: 'You can upgrade your plan at any time, or purchase additional one-off blog posts as needed.'
          }].map((faq, i) => <div key={faq.question} className="glass-card p-6 rounded-xl animate-fade-in" style={{
            animationDelay: `${i * 100 + 200}ms`
          }}>
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>)}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-card neon-glow p-8 sm:p-12 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to transform your content strategy?</h2>
            <p className="text-muted-foreground mb-8">
              Try our platform today and join the waitlist for our premium plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/demo">Start your free trial</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    Join the waitlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Join our Waitlist</DialogTitle>
                    <DialogDescription>
                      Be the first to know when we launch our premium plans.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitWaitlist)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      <FormField control={form.control} name="email" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      <FormField control={form.control} name="company" render={({
                      field
                    }) => <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      <Button type="submit" className="w-full btn-gradient">
                        Join Waitlist
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Pricing;