import React, { Component } from "react";
import moment from "moment";

//Component that shows individual posts
class RSSItem extends Component {
  render() {
    const { item } = this.props;
    // formating pubDate from RSS feed
    const pubDate = moment(item.pubDate).format("MMMM Do YYYY, h:mm:ss a");

    return (
      <div className="RSSItem">
        <p>Published: {pubDate}</p>
        <h1>{item.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
        <a href={item.link}>Read More</a>
      </div>
    );
  }
}

export default RSSItem;
