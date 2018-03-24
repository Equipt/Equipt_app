import React from 'react';

const About = () => (
  <section className="container">
    <div dangerouslySetInnerHTML={{
      __html: I18n.t('about')
    }}></div>
  </section>
)

export default About;
