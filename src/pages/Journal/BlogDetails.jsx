import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOGS } from '../../data/blogs';
import styles from './BlogDetails.module.css';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className={styles.notFound}>
        <div className={styles.container}>
          <h1>Blog not found</h1>
          <button className={styles.backButton} onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Get related blogs (all except current one)
  const relatedBlogs = BLOGS.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <article className={styles.page}>
      {/* Hero Image */}
      <div className={styles.heroSection}>
        <img src={blog.image} alt={blog.title} className={styles.heroImage} />
      </div>

      {/* Article Header */}
      <div className={styles.headerSection}>
        <div className={styles.container}>
          <button
            className={styles.backLink}
            onClick={() => navigate('/')}
          >
            ← Back to Journal
          </button>

          <h1 className={styles.title}>{blog.title}</h1>

          <div className={styles.meta}>
            <span className={styles.author}>By {blog.author}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>{blog.date}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.readingTime}>{blog.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className={styles.contentSection}>
        <div className={styles.container}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>

      {/* Related Articles */}
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <h2 className={styles.relatedTitle}>Related Articles</h2>

          <div className={styles.relatedGrid}>
            {relatedBlogs.map((relatedBlog) => (
              <div key={relatedBlog.id} className={styles.relatedCard}>
                <button
                  className={styles.relatedImageButton}
                  onClick={() => navigate(`/journal/${relatedBlog.slug}`)}
                  aria-label={`Read ${relatedBlog.title}`}
                >
                  <div className={styles.relatedImageContainer}>
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className={styles.relatedImage}
                    />
                  </div>
                </button>

                <button
                  className={styles.relatedTitleButton}
                  onClick={() => navigate(`/journal/${relatedBlog.slug}`)}
                >
                  <h3 className={styles.relatedCardTitle}>{relatedBlog.title}</h3>
                </button>

                <p className={styles.relatedDate}>{relatedBlog.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogDetails;
