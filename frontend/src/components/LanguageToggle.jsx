import { useState } from 'react';
import { FaLanguage } from 'react-icons/fa';

export default function LanguageToggle() {
  const [lang, setLang] = useState('EN');

  const toggle = () => {
    const next = lang === 'EN' ? 'PA' : 'EN';
    setLang(next);
    // In real implementation, hook into i18next:
    // i18n.changeLanguage(next === 'EN' ? 'en' : 'pa');
    localStorage.setItem('lang', next);
    console.log('Language switched to:', next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition"
      aria-label="Toggle language"
    >
      <FaLanguage className="text-xl" />
      {lang === 'EN' ? 'English' : 'ਪੰਜਾਬੀ'}
    </button>
  );
}