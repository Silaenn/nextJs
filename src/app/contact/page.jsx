import Image from "next/image";
import ContactForm from "@/components/contactForm/ContactForm";
import { FormSkeleton } from "@/components/skeletons/skeletons";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
};

const ContactPage = () => {
  return (
    <div className="relative min-h-screen py-24 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[20%] right-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-accent/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[50%] sm:w-[30%] h-[30%] bg-accent-2/5 blur-[70px] sm:blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">

          {/* Image Section — stacks below form on mobile */}
          <div className="relative h-[240px] sm:h-[340px] lg:h-[600px] w-full order-1 lg:order-1 reveal-up">
            <Image
              src="/contact.png"
              alt="Contact us"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(54,115,253,0.1)]"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="order-1 lg:order-2 reveal-up" style={{ animationDelay: "0.2s" }}>
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-accent mb-3 sm:mb-4 block">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.95] mb-6 sm:mb-8">
                Tell us about your{" "}
                <span className="text-white italic">Vision.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-textSoft/80 leading-relaxed font-medium">
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