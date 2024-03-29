import React from 'react';

const ErrorPage = () => {
  return (
    <div>
      <body>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <div></div>
              <h1>404</h1>
            </div>
            <h2>Page not found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <a href="#">home page</a>
          </div>
        </div>
      </body>
    </div>
  )
}

export default ErrorPage;