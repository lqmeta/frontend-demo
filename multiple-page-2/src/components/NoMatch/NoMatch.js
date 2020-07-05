import React from "react";
import './NoMatch.less';

function NoMatch(props) {

  return (
    <section className="no-match">
      <h3>
        No match for <code>{window.location.pathname}{window.location.hash}</code>
      </h3>
    </section>
  )
}

export default NoMatch;
