import React, { Component } from "react";
import RSSItem from "./RSSItem";

//Component that renders Items for each individual post
class RSSList extends Component {
  render() {
    const { data } = this.props;
    return (
      <>
        {data ? (
          data.map((item, key) => {
            return <RSSItem key={key} item={item} />;
          })
        ) : (
          <div className="RSSItem">
            <p>No data availabe</p>
          </div>
        )}
      </>
    );
  }
}

export default RSSList;
