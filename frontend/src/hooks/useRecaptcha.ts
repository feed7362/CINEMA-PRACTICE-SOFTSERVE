import { useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
    onCaptchaSuccess?: (token: string) => void;
  }
}

interface UseRecaptchaProps {
  siteKey: string;
  elementId: string; 
}

export const useRecaptcha = ({ siteKey, elementId }: UseRecaptchaProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.grecaptcha) {
      setReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('reCAPTCHA script loaded');
      setReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!window.grecaptcha) return;

    window.grecaptcha.render(elementId, {
      sitekey: siteKey,
      callback: (t: string) => {
        setToken(t);
        console.log('CAPTCHA TOKEN:', t);
      },
    });
  }, [ready, siteKey, elementId]);

  return { token, ready };
};
