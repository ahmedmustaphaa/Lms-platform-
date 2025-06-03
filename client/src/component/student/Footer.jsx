import React from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const links = [
    { link: 'Home', to: '/home' },
    { link: 'About Us', to: '/about' },
    { link: 'Contact Us', to: '/contact' },
    { link: 'Privacy', to: '/privacy' },
  ];

  return (
    <footer className="bg-[#101922] text-white py-12 px-6">
      <div className="max-w-8xl px-[80px] mx-auto grid md:grid-cols-3 gap-10">
        {/* Logo and Description */}
        <div>
          <img
            onClick={() => navigate('/')}
            src={assets.logo}
            alt="Logo"
            className="h-12 w-auto cursor-pointer"
          />
          <p className="mt-6 text-sm text-[#8A94A6] leading-relaxed">
            Generate Lorem Ipsum text with customizable options for characters,
            words, sentences, or paragraphs. Learn about the history and usage
            of this classic dummy text in design and typography.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <nav className="space-y-2 text-sm text-[#8A94A6]">
            {links.map((item, i) => (
              <Link key={i} to={item.to} className="hover:text-white block">
                {item.link}
              </Link>
            ))}
          </nav>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h2>
          <p className="text-sm text-[#8A94A6] mb-4">
            Stay updated with our latest news and offers. No spam.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-[#1A2633] text-white placeholder-[#6C7682] border border-[#2B3A4A] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-[#6C7682] border-t border-[#2B3A4A] pt-6">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
