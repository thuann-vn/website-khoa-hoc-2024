const AnimatedHeading = () => {
  return (
    <div
      id="animatedHeading"
      className="rbt-elements-area bg-color-white rbt-shadow-box mb--60"
    >
      <div className="wrapper">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Animated Heading</h4>
        </div>
        <div className="row g-5">
          <div className="col-lg-12">
            <h3 className="title">
              Clip Animated
              <span className="header-caption">
                <span className="cd-headline clip is-full-width">
                  <span className="cd-words-wrapper">
                    <b className="is-visible theme-gradient">Clip One.</b>
                    <b className="is-hidden theme-gradient">Clip Two.</b>
                    <b className="is-hidden theme-gradient">Clip Three.</b>
                  </span>
                </span>
              </span>
            </h3>

            <h3 className="title">
              Rotate Animated
              <span className="header-caption">
                <span className="cd-headline rotate-1">
                  <span className="cd-words-wrapper">
                    <b className="is-visible theme-gradient">Rotate One.</b>
                    <b className="is-hidden theme-gradient">Rotate Two.</b>
                    <b className="is-hidden theme-gradient">Rotate Three.</b>
                  </span>
                </span>
              </span>
            </h3>

            <h3 className="title">
              Type Animated
              <span className="header-caption">
                <span className="cd-headline type">
                  <span className="cd-words-wrapper">
                    <b className="is-visible theme-gradient">Type One.</b>
                    <b className="is-hidden theme-gradient">Type Two.</b>
                    <b className="is-hidden theme-gradient">Type Three.</b>
                  </span>
                </span>
              </span>
            </h3>

            <h3 className="title">
              Loading Animated
              <span className="header-caption">
                <span className="cd-headline loading-bar">
                  <span className="cd-words-wrapper">
                    <b className="is-visible theme-gradient">Loading One.</b>
                    <b className="is-hidden theme-gradient">Loading Two.</b>
                    <b className="is-hidden theme-gradient">Loading Three.</b>
                  </span>
                </span>
              </span>
            </h3>

            <h3 className="title">
              Zoom Animated
              <span className="header-caption">
                <span className="cd-headline zoom">
                  <span className="cd-words-wrapper">
                    <b className="is-visible theme-gradient">Zoom One.</b>
                    <b className="is-hidden theme-gradient">Zoom Two.</b>
                    <b className="is-hidden theme-gradient">Zoom Three.</b>
                  </span>
                </span>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeading;
