"use client";
import { useEffect } from 'react';

// This component dynamically loads the Adobe Fonts (Typekit) script using
// the NEXT_PUBLIC_TYPEKIT_ID environment variable. If the env var is not set,
// the loader is a no-op and will not try to fetch the script (prevents crashes).
const TypekitLoader: React.FC = () => {
  useEffect(() => {
    const kitId = "mye5agk";
    if (!kitId) {
      // No kit ID configured — skip loading Typekit.
      // If you want to use Gotham (or another Adobe font), set NEXT_PUBLIC_TYPEKIT_ID in .env.local
      // e.g. NEXT_PUBLIC_TYPEKIT_ID=yourKitId
      // and restart the dev server.
      // eslint-disable-next-line no-console
      console.warn('TypekitLoader: NEXT_PUBLIC_TYPEKIT_ID is not set. Skipping Adobe Fonts load.');
      return;
    }

    (function (d: Document) {
      const config = {
        kitId,
        scriptTimeout: 3000,
        async: true,
      } as const;

      const h = d.documentElement;
      const t = setTimeout(() => {
        h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
      }, config.scriptTimeout);

      const tk = d.createElement('script');
      h.className += ' wf-loading';
      tk.src = `https://use.typekit.net/${config.kitId}.js`;
      tk.async = true;
      tk.onload = function () {
        clearTimeout(t);
        try {
          (window as any).Typekit.load(config);
        } catch (e) {
          // ignore
        }
      };
      tk.onerror = function () {
        clearTimeout(t);
      };

      const s = d.getElementsByTagName('script')[0];
      s.parentNode!.insertBefore(tk, s);
    })(document);
  }, []);

  return null;
};

export default TypekitLoader;