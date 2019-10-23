import React, { Component } from "react";
import { connect } from "react-redux";
import RSSList from "../components/RSSList";
import { fetchRSS } from "../store/actions/RSSActions";
import { Dots } from "react-preloaders";

class AzurePage extends Component {
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
    // Temporary solution to avoid cors security issue
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    // Url of the RSS feed
    const rssUrl = "https://azurestatuscdn.azureedge.net/en-us/status/feed/";
    this.props.fetchRSS(CORS_PROXY + rssUrl);
    this.setState({ loading: false });
  };

  getSystemStatus = () => {
    if (this.props.rssFeed.length === 0 && !this.props.ErrorMessage) {
      // If the feed is empty, no malfunctions are found on the server
      return "Stable";
    }
    return "Unknown";
  };

  render() {
    const data = this.props.rssFeed;
    return (
      <div className="PageContainer">
        <Dots customLoading={this.state.loading} />
        <h1>Azure Server Status</h1>
        System status: {this.getSystemStatus()}
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
)(AzurePage);
