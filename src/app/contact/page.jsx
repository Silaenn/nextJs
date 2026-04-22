import Image from "next/image";
import ContactForm from "@/components/contactForm/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
};

const ContactPage = () => {
  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-accent-2/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Section - Original Style Reverted */}
          <div className="relative h-[400px] lg:h-[600px] reveal-up">
            <Image
              src="/contact.png"
              alt="Contact us"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(54,115,253,0.1)]"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="reveal-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-12">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4 block">Get In Touch</span>
                <h1 className="heading-xl leading-none mb-8">
                    Tell us about your <span className="text-white italic">Vision.</span>
                </h1>
                <p className="text-xl text-textSoft/80 leading-relaxed font-medium">
                    Ready to transform your ideas into a digital masterpiece? 
                    Our elite team is ready to bring your concept to life.
                </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
