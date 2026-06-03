import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOGS } from '../../../data/blogs';
import styles from './JournalSection.module.css';

const JournalSection = () => {
  const navigate = useNavigate();

  const handleBlogClick = (slug) => {
    navigate(`/journal/${slug}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>LUMORIA JOURNAL</h2>
        <p className={styles.sectionSubtitle}>
          Jewellery guides, styling inspiration and care tips.
        </p>

        <div className={styles.blogsGrid}>
          {BLOGS.map((blog) => (
            <article key={blog.id} className={styles.blogCard}>
              <button
                className={styles.imageButton}
                onClick={() => handleBlogClick(blog.slug)}
                aria-label={`Read ${blog.title}`}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className={styles.image}
                  />
                  <div className={styles.dateOverlay}>{blog.date}</div>
                </div>
              </button>

              <div className={styles.cardContent}>
                <h3 className={styles.blogTitle}>
                  <button
                    className={styles.titleButton}
                    onClick={() => handleBlogClick(blog.slug)}
                  >
                    {blog.title}
                  </button>
                </h3>

                <p className={styles.excerpt}>{blog.excerpt}</p>

                <div className={styles.metadata}>
                  <span className={styles.readingTime}>{blog.readingTime}</span>
                  <span className={styles.author}>By {blog.author}</span>
                </div>

                <button
                  className={styles.readMoreLink}
                  onClick={() => handleBlogClick(blog.slug)}
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
