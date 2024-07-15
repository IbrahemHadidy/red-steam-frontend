import { useEffect } from 'react';
import $ from 'utils/$selector';

import pwaIcon from 'images/pwa-icon.png';

function useDynamicMetaTags(
  options: {
    title?: string;
    background?: string;
    description?: string;
    imageSrc?: string;
    twitterSite?: string;
    fbAppId?: string;
  },
  dependencyArray?: unknown[],
) {
  useEffect(() => {
    // Destructure options object
    const { title, background, description, twitterSite, fbAppId, imageSrc } = options;
    const defaultDescription =
      'Red Steam is a clone of Steam. It is an educational project and not intended for profit.';

    // Update meta tags when component mounts or when options change
    document.title = title || 'Red Steam';
    document.body.style.background = background || '#1b2838';
    $('meta[name="description"]')?.setAttribute('content', description || defaultDescription);
    $('meta[name="twitter:card"]')?.setAttribute('content', imageSrc || pwaIcon.src);
    $('meta[name="twitter:site"]')?.setAttribute('content', twitterSite || '');
    $('meta[property="og:title"]')?.setAttribute('content', title || 'Red Steam');
    $('meta[property="twitter:title"]')?.setAttribute('content', title || 'Red Steam');
    $('meta[property="og:type"]')?.setAttribute('content', 'website');
    $('meta[property="fb:app_id"]')?.setAttribute('content', fbAppId || '');
    $('meta[property="og:site"]')?.setAttribute('content', 'Red Steam');
    $('meta[property="og:url"]')?.setAttribute('content', window.location.href || '');
    $('meta[property="og:description"]')?.setAttribute(
      'content',
      description || defaultDescription,
    );
    $('meta[property="twitter:description"]')?.setAttribute(
      'content',
      description || defaultDescription,
    );
    $('meta[property="og:image"]')?.setAttribute('content', imageSrc || pwaIcon.src);
    $('meta[name="twitter:image"]')?.setAttribute('content', imageSrc || pwaIcon.src);
  }, [options, dependencyArray]);
}

export default useDynamicMetaTags;
