import Image from "next/image";

export const metadata = {
  title: "About Us",
  description: "Learn more about our creative agency",
};

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Web Development",
    description: "Custom websites built with modern technologies and best practices."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "UI/UX Design",
    description: "Beautiful and intuitive designs that enhance user experience."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance",
    description: "Optimized solutions that deliver exceptional speed and reliability."
  },
];

const AboutPage = () => {
  return (
    <div className="container-custom py-12 overflow-hidden">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 lg:order-1 animate-fadeInLeft">
          <h2 className="text-primary font-semibold mb-4 tracking-wider">ABOUT AGENCY</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            We create digital ideas that are <span className="text-primary">bigger, bolder, braver,</span> and better
          </h1>
          <p className="text-textSoft text-lg leading-relaxed mb-8">
            We believe in good ideas, flexibility, and precision. We&apos;re your dedicated partner in 
            transforming complex challenges into seamless digital solutions. From consulting to 
            full-scale development, we help your business thrive.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center sm:text-left animate-fadeIn"
                style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-textSoft">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] animate-imageReveal">
          <Image
            src="/about.png"
            alt="About our agency"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 border-t border-bgSoft">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-textSoft max-w-2xl mx-auto">
            We provide comprehensive digital solutions to help your business grow and adapt 
            to the ever-changing digital landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="card group hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 animate-scaleIn opacity-0"
              style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="text-primary mb-4 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-textSoft text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
