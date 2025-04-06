
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Pricing = () => {
  // Pricing tiers
  const pricingTiers = [
    {
      name: 'Free',
      description: 'Perfect for trying out our service',
      price: {
        monthly: '$0',
        weekly: '$0',
      },
      features: [
        { name: '1 blog post demo', included: true },
        { name: 'LinkedIn publishing', included: true },
        { name: 'Gmail approval flow', included: true },
        { name: 'SEO optimization', included: true },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false },
      ],
      cta: 'Try for free',
      popular: false,
      ctaLink: '/demo',
      gradient: 'from-muted/40 to-muted/20',
    },
    {
      name: 'Starter',
      description: 'Best for individuals and small businesses',
      price: {
        monthly: '$89',
        weekly: '$25',
      },
      features: [
        { name: '2 blogs per day', included: true },
        { name: 'LinkedIn publishing', included: true },
        { name: 'Gmail approval flow', included: true },
        { name: 'SEO optimization', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom branding', included: false },
      ],
      cta: 'Get started',
      popular: true,
      ctaLink: '/demo',
      gradient: 'from-primary/80 to-secondary/80',
    },
    {
      name: 'Intermediate',
      description: 'For growing businesses needing more content',
      price: {
        monthly: '$249',
        weekly: '$67',
      },
      features: [
        { name: '4 blogs per day', included: true },
        { name: 'LinkedIn publishing', included: true },
        { name: 'Gmail approval flow', included: true },
        { name: 'SEO optimization', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom branding', included: true },
      ],
      cta: 'Get started',
      popular: false,
      ctaLink: '/demo',
      gradient: 'from-neon-blue/50 to-neon-purple/50',
    },
    {
      name: 'Enterprise',
      description: 'For large teams with high volume needs',
      price: {
        monthly: 'Custom',
        weekly: 'Custom',
      },
      features: [
        { name: 'Unlimited blogs', included: true },
        { name: 'LinkedIn publishing', included: true },
        { name: 'Gmail approval flow', included: true },
        { name: 'SEO optimization', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true },
      ],
      cta: 'Contact us',
      popular: false,
      ctaLink: '/contact',
      gradient: 'from-muted/40 to-muted/20',
    },
  ];

  // Billing toggle
  const [billing, setBilling] = React.useState<'monthly' | 'weekly'>('weekly');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
        
        <div className="container flex flex-col items-center text-center py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl animate-fade-in">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
            Choose the plan that&apos;s right for your content needs, with no hidden fees.
          </p>
          
          {/* Billing toggle */}
          <div className="mt-10 flex items-center gap-4 p-1 rounded-lg bg-muted/20 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billing === 'monthly' 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted/50"
              )}
              onClick={() => setBilling('monthly')}
            >
              Monthly billing
            </button>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                billing === 'weekly' 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted/50"
              )}
              onClick={() => setBilling('weekly')}
            >
              Weekly billing
              <span className="ml-1.5 inline-block py-0.5 px-1.5 text-xs rounded-full bg-primary/20 text-foreground">
                Save 12%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_70%_20%,var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent -z-10"></div>
        
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, i) => (
              <div 
                key={tier.name}
                className={cn(
                  "relative rounded-xl overflow-hidden animate-fade-in",
                  tier.popular && "md:scale-105 md:-translate-y-1 z-10"
                )}
                style={{ animationDelay: `${i * 100 + 300}ms` }}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {/* Card content */}
                <div className={cn(
                  "h-full flex flex-col p-6",
                  tier.popular ? "glass-card neon-border" : "glass-card"
                )}>
                  <div className="mb-5">
                    <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                    <p className="text-muted-foreground text-sm">{tier.description}</p>
                  </div>
                  
                  <div className="mb-5">
                    <p className="text-4xl font-bold">
                      {tier.price[billing]}
                      {typeof tier.price[billing] === 'string' && tier.price[billing] !== 'Custom' && (
                        <span className="text-muted-foreground text-sm font-normal ml-1">
                          /{billing === 'monthly' ? 'month' : 'week'}
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-neon-green shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button
                      asChild
                      className={cn(
                        "w-full",
                        tier.popular 
                          ? "btn-gradient" 
                          : "bg-muted/30 hover:bg-muted/50 text-foreground"
                      )}
                    >
                      <Link to={tier.ctaLink}>
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-muted/10">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Got questions? We&apos;ve got answers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                question: 'How does the free trial work?',
                answer: 'The free trial lets you experience the full process of creating one blog post using our platform. You\'ll see every step from keyword research to LinkedIn publishing.',
              },
              {
                question: 'Can I cancel my subscription at any time?',
                answer: 'Yes, you can cancel your subscription at any time. We offer a hassle-free cancellation process with no questions asked.',
              },
              {
                question: 'How is content quality ensured?',
                answer: 'Our AI utilizes advanced models to ensure high-quality content. Additionally, the approval process via Gmail gives you full control to request changes before publishing.',
              },
              {
                question: 'Do I need a LinkedIn account to use the service?',
                answer: 'For the LinkedIn publishing feature, you\'ll need a LinkedIn account. However, you can still use our service to create content without the auto-publishing feature.',
              },
              {
                question: 'What happens if I need more blogs than my plan allows?',
                answer: 'You can upgrade your plan at any time, or purchase additional one-off blog posts as needed.',
              },
            ].map((faq, i) => (
              <div 
                key={faq.question}
                className="glass-card p-6 rounded-xl animate-fade-in"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-card neon-glow p-8 sm:p-12 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to transform your content strategy?</h2>
            <p className="text-muted-foreground mb-8">
              Try our platform today and see the difference it can make for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/demo">Start your free trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
