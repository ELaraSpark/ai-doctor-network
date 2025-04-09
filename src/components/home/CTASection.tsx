import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PicassoIllustration } from '@/components/illustrations'; // Import illustration
import { PicassoBackground } from '@/components/illustrations/PicassoBackground'; // Use named import

const CTASection = () => {
  return (
    // Updated styles: light bg, padding, text center, relative for background
    <section className="relative bg-gray-100 py-20 px-6 text-center overflow-hidden">
      {/* Add subtle background */}
      <PicassoBackground opacity={5} /> 
      <div className="relative z-10 max-w-2xl mx-auto"> {/* Max width container */}
        {/* Add Illustration - Use accent color */}
        <div className="mb-8 flex justify-center">
          <PicassoIllustration name="chat" size="xl" className="text-accent" /> 
        </div>
        {/* Updated heading */}
        <h2 className="text-3xl font-bold mb-4 leading-tight text-gray-900">
          Ready to transform your healthcare experience?
        </h2>
        {/* Updated paragraph with handwritten font */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed font-handwritten">
          Our AI agents are available 24/7 to assist with your medical questions and needs.
        </p>
        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/register">
            {/* Use primary green button */}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold rounded-lg px-7 py-3.5"> 
              Get Started
            </Button>
          </Link>
          <Link to="/features">
            {/* Use standard outline button */}
            <Button variant="outline" className="text-base font-semibold rounded-lg px-7 py-3.5"> 
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
