import { useEffect, useState } from "react";
import css from "./Quotes.module.css";
import { quotes } from "../../../../constants/vars";

function Quotes() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const current = quotes[quoteIndex];

  return (
    <div className={css.quoteContainer}>
      {current.text && <p className={css.quoteText}>'{current.text}'</p>}
      {current.author && <p className={css.quoteAuthor}>— {current.author}</p>}
    </div>
  );
}

export default Quotes;
