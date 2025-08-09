import React, { useState, useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import { BookingView } from './components/BookingView';
import { PaymentView } from './components/PaymentView';
import { ConfirmationView } from './components/ConfirmationView';
import { WritingStudio } from './components/WritingStudio';
import { CertificateView } from './components/CertificateView';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PRICING_PLANS } from './components/constants/constants';
import type { View, TimeSlot } from './components/types/types';

// Mock certification function (no API needed)
const generateMockCertification = async (text: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return `✅ CERTIFIED HUMAN-MADE CONTENT

This content has been verified as authentic human writing by Notar-EYES™.

Content Analysis:
• Length: ${text.length} characters
• Words: ${text.trim().split(/\s+/).length} words
• Writing Style: Natural and authentic
• AI Detection: No artificial patterns detected
• Timestamp: ${new Date().toLocaleString()}

🏆 Verified by Notar-EYES™ Human Content Authentication System

This certificate confirms that the submitted content exhibits genuine human creativity, natural language patterns, and authentic thought processes.

Certificate ID: DEMO-${Date.now()}`;
};

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [finalText, setFinalText] = useState('');
  const [certificationSummary, setCertificationSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartBooking = useCallback(() => {
    setView('booking');
    setError(null);
  }, []);

  const handleSlotSelect = useCallback((slot: TimeSlot) => {
    setSelectedSlot(slot);
    setView('payment');
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setIsLoading(true);
    // Simulate a short delay for confirmation
    setTimeout(() => {
      setIsLoading(false);
      setView('confirmation');
    }, 1500);
  }, []);

  const handleStartWriting = useCallback(() => {
    setView('writing');
  }, []);

  const handleCertification = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    setFinalText(text);
    try {
      // Use mock certification instead of Gemini API
      const summary = await generateMockCertification(text);
      setCertificationSummary(summary);
      setView('certified');
    } catch (err) {
      console.error("Certification failed:", err);
      setError("We encountered an issue generating your certificate. The notary might be on a coffee break. Please try again.");
      setView('writing');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setView('landing');
    setFinalText('');
    setCertificationSummary('');
    setSelectedSlot(null);
    setError(null);
  }, []);

  const renderView = () => {
    switch (view) {
      case 'booking':
        return <BookingView onSlotSelect={handleSlotSelect} onBack={handleReset} />;
      case 'payment':
        const singleSessionPrice = parseInt(PRICING_PLANS[0].price.replace('$', ''), 10);
        return (
          <PaymentView
            slot={selectedSlot}
            price={singleSessionPrice}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setView('booking')}
            isLoading={isLoading}
          />
        );
      case 'confirmation':
        return <ConfirmationView slot={selectedSlot} onStart={handleStartWriting} onHome={handleReset} />;
      case 'writing':
        return (
          <WritingStudio
            onComplete={handleCertification}
            onBack={handleReset}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'certified':
        return (
          <CertificateView
            humanText={finalText}
            certificationSummary={certificationSummary}
            onReset={handleReset}
          />
        );
      case 'landing':
      default:
        return <LandingPage onStart={handleStartBooking} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark">
      <Header onLogoClick={handleReset} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}