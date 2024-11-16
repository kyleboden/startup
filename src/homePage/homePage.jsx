import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

export function HomePage() {
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);


  return (
    <main>
      <br />
      <img
        src="ApplySmartT.png"
        style={{ width: '400px', height: 'auto' }}
        className="responsive-image"
        alt="Apply Smart logo"
      />
      <br />
      <br />

      <div>
        <h3>Stop getting overlooked – ApplySmart helps you stand out.</h3>
        <br />
        <p>
          ApplySmart is your personal job-hunting assistant, designed to
          simplify the exhausting application process. We create customized
          resumes and cover letters tailored to each job you apply for. Our
          advanced AI analyzes job descriptions alongside your unique
          qualifications, helping you stand out from the crowd and bypass
          automated filters used by many companies. With ApplySmart, you
          increase your chances of getting noticed by recruiters and landing
          that interview. Start your job hunt with us today and experience a
          faster, more effective way to secure your next opportunity!
        </p>
        <h4>
          <br />
          <br />
          <Link to="/login">Sign up</Link> or{' '}
          <Link to="/login">Login</Link> to get started.
        </h4>

        <br />        <br />
        <div className="quote-box bg-light text-dark">
        <h3>Quote of the Day</h3>
          <p className="quote">{quote}</p>
          <p className="author">— {quoteAuthor}</p>
        </div>
        
      </div>
    </main>
  );
}
