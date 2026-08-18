'use client';

export default function LanguageToggle() {
  const changeLanguage = (lang: 'en' | 'id') => {
    const domain = window.location.hostname;
    document.cookie = `googtrans=/id/${lang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/id/${lang}; path=/`;

    window.location.reload();
  };

  return (
    <div className="flex mx-2 gap-1">
      <button onClick={() => changeLanguage('id')} className="text-sm font-medium cursor-pointer">
        ID
      </button>
      <span>|</span>
      <button onClick={() => changeLanguage('en')} className="text-sm font-medium cursor-pointer">
        EN
      </button>
    </div>
  );
}
