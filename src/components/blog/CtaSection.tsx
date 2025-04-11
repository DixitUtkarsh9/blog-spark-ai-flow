
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-muted/10">
      <div className="container">
        <div className="max-w-3xl mx-auto glass-card neon-glow p-8 sm:p-12 rounded-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to scale your content strategy?</h2>
          <p className="text-muted-foreground mb-8">
            Get full access to our AI Blog Writer and create unlimited SEO-optimized content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-gradient text-lg">
              <Link to="/pricing">View pricing plans</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/demo">Try free demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
