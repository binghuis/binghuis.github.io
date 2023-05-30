import { useEffect } from 'react';

const Utterances = () => {
  useEffect(() => {
    const script =
      document.createElement('script');
    script.src =
      'https://raw.gitmirror.com/binghuis/assets/main/libs/utteranc.es/client.js';
    script.setAttribute(
      'repo',
      'binghuis/binghuis.github.io',
    );
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute(
      'theme',
      'preferred-color-scheme',
    );
    script.setAttribute(
      'crossorigin',
      'anonymous',
    );
    script.async = true;

    document
      ?.getElementById('comments')
      ?.appendChild(script);
  }, []);

  return <div id="comments" />;
};

export default Utterances;
