import Image from "next/image";
import ContactForm from "@/components/contactForm/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
};

const ContactPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative h-[400px] lg:h-[600px] order-2 lg:order-1">
          <Image
            src="/contact.png"
            alt="Contact us"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
