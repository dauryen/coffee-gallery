import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'coffee-house-reviews-v1';

const seedReviews = [
  {
    id: 1,
    name: 'Aigul',
    text: 'Капучиносы өте дәмді, атмосферасы жылы екен.',
    rating: 5,
    createdAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Nurlan',
    text: 'Достармен отыруға өте жайлы орын.',
    rating: 4,
    createdAt: '2026-03-03T14:30:00.000Z'
  }
];

const ui = {
  kk: {
    eye: 'Келушілер пікірі',
    title: 'Пікір қалдыру',
    avg: 'Орташа баға',
    total: 'Пікір саны',
    noReviews: 'Әзірге пікір жоқ. Алғашқы пікірді сіз қалдырыңыз.',
    yourName: 'Атыңыз',
    yourReview: 'Пікіріңіз',
    yourRating: 'Бағаңыз',
    placeholderName: 'Мысалы, Айдана',
    placeholderReview: 'Кофехана туралы ойыңызды жазыңыз...',
    submit: 'Пікір жіберу',
    success: 'Пікір сәтті сақталды',
    needName: 'Атыңызды жазыңыз',
    needText: 'Пікір мәтінін жазыңыз',
    dateLabel: 'Күні'
  },
  mn: {
    eye: 'Зочдын сэтгэгдэл',
    title: 'Сэтгэгдэл үлдээх',
    avg: 'Дундаж үнэлгээ',
    total: 'Сэтгэгдлийн тоо',
    noReviews: 'Одоогоор сэтгэгдэл алга. Та хамгийн эхний сэтгэгдлийг үлдээнэ үү.',
    yourName: 'Таны нэр',
    yourReview: 'Таны сэтгэгдэл',
    yourRating: 'Таны үнэлгээ',
    placeholderName: 'Жишээ нь, Айдана',
    placeholderReview: 'Кофешопын талаар саналаа бичнэ үү...',
    submit: 'Сэтгэгдэл илгээх',
    success: 'Сэтгэгдэл амжилттай хадгалагдлаа',
    needName: 'Нэрээ бичнэ үү',
    needText: 'Сэтгэгдлээ бичнэ үү',
    dateLabel: 'Огноо'
  },
  en: {
    eye: 'Guest Reviews',
    title: 'Leave a Review',
    avg: 'Average Rating',
    total: 'Total Reviews',
    noReviews: 'No reviews yet. Be the first to leave one.',
    yourName: 'Your Name',
    yourReview: 'Your Review',
    yourRating: 'Your Rating',
    placeholderName: 'For example, Aida',
    placeholderReview: 'Write what you think about the coffee house...',
    submit: 'Submit Review',
    success: 'Review saved successfully',
    needName: 'Please enter your name',
    needText: 'Please enter your review',
    dateLabel: 'Date'
  }
};

function formatDate(dateString, lang) {
  const localeMap = {
    kk: 'kk-KZ',
    mn: 'mn-MN',
    en: 'en-US'
  };

  return new Date(dateString).toLocaleDateString(localeMap[lang] || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function StarRow({ rating }) {
  return (
    <div className="review-stars-display" aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewSection({ lang = 'kk' }) {
  const t = useMemo(() => ui[lang] || ui.kk, [lang]);

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews(parsed);
      } catch {
        setReviews(seedReviews);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedReviews));
      }
    } else {
      setReviews(seedReviews);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedReviews));
    }
  }, []);

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setMessage(t.needName);
      return;
    }

    if (!text.trim()) {
      setMessage(t.needText);
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      rating,
      createdAt: new Date().toISOString()
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    setName('');
    setText('');
    setRating(5);
    setMessage(t.success);

    setTimeout(() => setMessage(''), 2500);
  }

  return (
    <section className="reviews-section" id="reviews">
      <div className="sec-header reveal">
        <span className="sec-eye">{t.eye}</span>
        <h2 className="sec-title">{t.title}</h2>
      </div>

      <div className="reviews-wrap reveal">
        <div className="review-summary-card">
          <div className="review-summary-top">
            <div>
              <div className="review-summary-label">{t.avg}</div>
              <div className="review-average-number">{average}</div>
            </div>

            <div>
              <div className="review-summary-label">{t.total}</div>
              <div className="review-total-number">{reviews.length}</div>
            </div>
          </div>

          <StarRow rating={Math.round(Number(average))} />
        </div>

        <form className="review-form-card" onSubmit={handleSubmit}>
          <label className="review-label">
            {t.yourName}
            <input
              type="text"
              className="review-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.placeholderName}
            />
          </label>

          <label className="review-label">
            {t.yourRating}
            <div className="star-picker">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={star <= rating ? 'star-btn active' : 'star-btn'}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </label>

          <label className="review-label">
            {t.yourReview}
            <textarea
              className="review-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholderReview}
              rows={5}
            />
          </label>

          <button type="submit" className="review-submit-btn">
            {t.submit}
          </button>

          {message && <div className="review-message">{message}</div>}
        </form>
      </div>

      <div className="review-grid reveal">
        {reviews.length === 0 ? (
          <div className="review-empty">{t.noReviews}</div>
        ) : (
          reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-card-top">
                <div className="review-user">{review.name}</div>
                <StarRow rating={review.rating} />
              </div>

              <p className="review-text">{review.text}</p>

              <div className="review-date">
                {t.dateLabel}: {formatDate(review.createdAt, lang)}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}