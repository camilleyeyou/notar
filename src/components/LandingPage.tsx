import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { EyeIcon, HUMAN_11_MARKERS, PRICING_PLANS, COURSE_PRICE } from './constants/constants';
import type { PricingPlan } from './types/types';

interface LandingPageProps {
  onStart: () => void;
}

// Utility function to scroll to waitlist section
const scrollToWaitlist = () => {
  const newsletterSection = document.getElementById('newsletter');
  if (newsletterSection) {
    newsletterSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    
    // Add a subtle highlight effect
    newsletterSection.style.transform = 'scale(1.02)';
    newsletterSection.style.transition = 'transform 0.3s ease-in-out';
    
    setTimeout(() => {
      newsletterSection.style.transform = 'scale(1)';
    }, 600);
  }
};

const HeroSection: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section className="relative text-center py-16 md:py-24 overflow-hidden rounded-lg">
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      src="/hero-video.mp4" 
    ></video>
    <div className="absolute top-0 left-0 w-full h-full bg-brand-dark/80 z-10"></div>
    <div className="relative z-20 container mx-auto px-4">
      <div className="inline-block bg-brand-slate p-3 rounded-full mb-6 border border-gray-700">
        <EyeIcon className="w-12 h-12 text-brand-accent" />
      </div>
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
        This content was written by a human.
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        In a world of generated everything, Notar-EYES™ is proof-of-personhood. We observe you write, live, and issue a certificate of human authorship. A little ceremony for the real.
      </p>
      <Button onClick={() => window.open('https://calendar.google.com/calendar/u/1?cid=ODIwOTkxMzA3YzI5MTgxODAzZDJlNmRhYjM3Y2M4ZGMwZjFhYWJkOWFmOGYzZjViYTZjYTQ1MmQ1ZjYyYmU2MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t', '_blank')}>Book a Session</Button>
    </div>
  </section>
);

const HowItWorksSection: React.FC = () => (
  <section id="how-it-works" className="py-16 relative bg-brand-dark/70">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-white">How It Works</h2>
        <p className="text-gray-400 mt-2">A simple process for profound authenticity.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-brand-slate border-2 border-brand-accent rounded-full text-3xl font-serif text-brand-accent mb-4">1</div>
          <h3 className="text-xl font-serif text-white mb-2">Book a Notary</h3>
          <p className="text-gray-400">Choose a time that works for you or go live with the next available Certified Human Content Notary™.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-brand-slate border-2 border-brand-accent rounded-full text-3xl font-serif text-brand-accent mb-4">2</div>
          <h3 className="text-xl font-serif text-white mb-2">Write Live</h3>
          <p className="text-gray-400">You create. We observe. Your text is never stored or judged, only witnessed for its human spark.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-brand-slate border-2 border-brand-accent rounded-full text-3xl font-serif text-brand-accent mb-4">3</div>
          <h3 className="text-xl font-serif text-white mb-2">Get Certified</h3>
          <p className="text-gray-400">Receive a timestamped, shareable certificate as proof of your authentic, human-made work.</p>
        </div>
      </div>
    </div>
  </section>
);

const Human11Section: React.FC = () => (
  <section
    id="human11"
    className="py-16 bg-brand-slate -mx-4 px-4 md:rounded-lg relative"
    style={{
      backgroundImage: "url('/typing-human.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-brand-slate/80 pointer-events-none"></div>
    <div className="relative z-10 container mx-auto px-4">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white">The Human 11™ Framework</h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          AI can be polished. But humanity is beautifully inconsistent. Our notaries are trained to recognize the difference through 11 proprietary markers.
        </p>
      </div>
    </div>
  </section>
);

const PricingSection: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section id="pricing" className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-white">Pricing</h2>
        <p className="text-gray-400 mt-2">Authenticity, priced for everyone.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan: PricingPlan) => (
          <Card key={plan.title} isFeatured={plan.isFeatured} className="flex flex-col">
            <div className="flex-grow">
              <h3 className="text-2xl font-serif text-white">{plan.title}</h3>
              <p className="text-4xl font-bold text-brand-accent my-4">{plan.price}</p>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-2 text-gray-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              {plan.title === 'Enterprise' ? (
                <Button
                  onClick={() => window.location.href = 'mailto:sales@notar-eyes.com'}
                  variant={'secondary'}
                  className="w-full"
                >
                  Contact Us
                </Button>
              ) : (
                <Button
                  onClick={scrollToWaitlist}
                  variant={plan.isFeatured ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  Join Waitlist
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const CourseSection: React.FC = () => (
  <section id="course" className="py-16">
    <div className="container mx-auto px-4">
      <Card isFeatured={true}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-brand-accent font-semibold mb-2">NEW: The Certification Program</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Get Certified and Come Work With Us.</h2>
            <p className="text-gray-300 mb-6">Master The Human 11™ framework through our certification program and join our network of Certified Human Content Notaries. We're looking for individuals who can champion human creativity in the AI era.</p>
            <Button onClick={() => window.location.href = 'mailto:careers@notar-eyes.com'}>Apply to Be a Notary</Button>
          </div>
          <div className="text-center">
              <img src="https://picsum.photos/seed/notarycourse/500/300" alt="A person thoughtfully writing at a desk" className="rounded-lg shadow-xl"/>
          </div>
        </div>
      </Card>
    </div>
  </section>
);

const NewsletterSignupSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeqrMntUzAOHazMTY4rYi7vMJnZ7WT_TJEGXcOqhboQdfggag/formResponse';
  const EMAIL_FIELD_NAME = 'entry.1515327798'; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append(EMAIL_FIELD_NAME, email);

      // Submit to Google Forms
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Forms
        body: formData,
      });

      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there's an error, the form likely submitted successfully due to no-cors mode
      setIsSubmitted(true);
      setEmail('');
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="newsletter"
      className="py-16 bg-gradient-to-r from-brand-dark to-brand-slate relative"
      style={{
        backgroundImage: "url('/Writer-observation .png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-brand-dark/80 pointer-events-none"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-brand-slate p-2 rounded-full mb-6 border border-gray-700">
            <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Join the Human Authenticity Movement
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            Be the first to know about new features, get early access to beta programs, and receive insights on preserving human creativity in the AI age.
          </p>

          {isSubmitted ? (
            <div className="bg-green-900/30 border border-green-500 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-green-400 font-semibold">Successfully signed up!</span>
              </div>
              <p className="text-green-300">Thank you for joining our community. We'll keep you updated on our mission to preserve human authenticity.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-brand-slate border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="whitespace-nowrap"
              >
                {isSubmitting ? 'Signing Up...' : 'Join Waitlist'}
              </Button>
            </form>
          )}

          <p className="text-gray-400 text-sm">
            No spam, ever. Unsubscribe anytime. We respect your human inbox.
          </p>
        </div>
      </div>
    </section>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="space-y-16 isolate">
      <HeroSection onStart={onStart} />
      <HowItWorksSection />
      <Human11Section />
      <PricingSection onStart={onStart} />
      <CourseSection />
      <NewsletterSignupSection />
    </div>
  );
};