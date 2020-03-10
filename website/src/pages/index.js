import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>The Power of Aver Verification</>,
    description: (
      <>
        Integrate and harness the power of Aver to verify your users in your applications.  Verify identification documents, perform international watchlist searches, and check adverse media.
      </>
    ),
  },
  {
    title: <>Easy-to-use REST API</>,
    description: (
      <>
        Aver provides a secure and easy-to-use API.  Regardless of your platform or language, access the Aver API using a standard REST API to take advantage of all Aver Verification features.
      </>
    ),
  },
  {
    title: <>Flexible Integration Options</>,
    description: (
      <>
        Whether you only want to write a few lines of code and use a hosted enrollment for your users, all the way to collecting and providing your own data, there are flexible options to suit your needs.
      </>
    ),
  }
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src="https://raw.githubusercontent.com/goaver/api-integration/master/images/ver_logo_inverted.png"></img>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle"></p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/quickstart')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
