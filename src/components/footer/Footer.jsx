import React from "react";

const Footer = ({ session }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bgSoft/30 border-t border-bgSoft/50 mt-auto">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            IdeaReality
          </div>
          
          {!session?.user && (
            <div className="flex items-center gap-6 text-sm text-textSoft">
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="/blog" className="hover:text-white transition-colors">
                Blog
              </a>
              <a href="https://github.com/Silaenn/nextJs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          )}

          <div className="text-sm text-textSoft">
            © {currentYear} IdeaReality. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
