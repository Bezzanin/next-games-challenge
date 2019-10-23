import React, { Component } from "react";
import { connect } from "react-redux";
import RSSList from "../components/RSSList";
import { fetchRSS } from "../store/actions/RSSActions";
import { Dots } from "react-preloaders";

class DatadogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  // A variable that can be referenced to start and stop setInterval() method
  RefreshInterval;
  componentDidMount() {
    this.fetchData();
    // Refresh the Feed each 10 minutes
    this.intervalID = setInterval(this.fetchData.bind(this), 600000);
  }

  componentWillUnmount() {
    // Stop the setInterval() method when component unmonts
    clearTimeout(this.RefreshInterval);
  }
  // Fetching data from RSS link
  fetchData = () => {
    // Url of the RSS feed
    const rssUrl = "https://status.datadoghq.com/history.rss";
    this.props.fetchRSS(rssUrl);
    this.setState({ loading: false });
  };

  render() {
    // Shows only 5 last posts
    const data = this.props.rssFeed.slice(0, 5);
    return (
      <div className="PageContainer">
        <Dots customLoading={this.state.loading} />
        <h1>Datadog 5 Past Incidents</h1>
        <p>
          Automatic refresh once 10 minutes. Last Updated:{" "}
          {this.props.lastUpdatedAt}
        </p>
        <RSSList data={data} />
        <p>{this.props.ErrorMessage}</p>
      </div>
    );
  }
}

export default connect(
  //this is the mapStateToProps and mapDispatchToProps functions in simplified way
  (state, ownProps) => ({
    rssFeed: state.rss.rssFeed,
    ErrorMessage: state.rss.ErrorMessage,
    lastUpdatedAt: state.rss.lastUpdatedAt
  }),
  { fetchRSS }
)(DatadogPage);
