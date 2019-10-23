# Next Games Interview Code Assignment

Simple, extendable React-Redux site for displaying data from different services.

## About

Simple application that fetches information from RSS feeds. Currently application shows 5 latest incidents from Datadog and the Azure services that are currently unavailable. During the development process there were no incidents with Azure services and therefore the Azure Status page is not tested in real case.

The following dependencies are used inside the application

```
    "moment": "^2.24.0",
    "react": "^16.10.2",
    "react-dom": "^16.10.2",
    "react-preloaders": "^3.0.3",
    "react-redux": "^7.1.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.2.0",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0",
    "rss-parser": "^3.7.3"
```

## Research Process

The research process was started from analysing the status pages given in the task. There were 2 pages that needs to be used inside the application:

**1. Azure Status Page**

First page was [Microsoft Azure status page](https://status.azure.com/en-us/status). The goal was to find a way to fetch the status of the servers and filter them to show only specific services in some regions. The current page offers a RSS link to get the information, but the RSS feed was empty and do not return any information needed. Therefore, I started to look for alternative solutions. I found the way to get information using the Azure API's [Resource Health](https://docs.microsoft.com/en-us/rest/api/resourcehealth/availabilitystatuses/listbysubscriptionid) service, but it shows only services that are currently used by you and do not show all service statuses. Using this method I was able to get status of Virtual Machines in different regions, but Azure does not allow me to use Azure Functions in other regions beside Europe. Therefore I start looking for different solution. As an option I was thinking to use a client-side web scraping using the Regex, but the solution is highly unstable and not production ready, so I dropped this option.

After some additional research in I found out that previously Azure have used different RSS links that contained information about specific service or region ([forum link](https://social.msdn.microsoft.com/Forums/azure/en-US/5c891757-3ee7-4e51-96b3-24dbf867342a/api-or-rss-feed-for-health-status-for-azure-services?forum=azureapimgmt)). The Azure Support team replied that it is not possible to get the information from RSS like it used to be before. However, according to the [stackoverflow answer](https://stackoverflow.com/questions/27389042/azure-status-rss-feed) now the RSS feed only shows data whenever there is an issue with some service and by default it is just empty.

To conclude, I decided to use the RSS link that is provided in the Azure Status page show an issues inside my application, but I was not able to fully test it since there was no issues during the development and the RSS was always empty.

**2. Datadog Status Page**

Second page was [Datadog Status Page](https://status.datadoghq.com/) and the goal was to show latest 5 service incidents. When I visit the page first time I have noticed that it gives opportunity to follow the incidents by using RSS feed. I have connected the RSS feed to my application and limit the amount of news to 5 latest. This page does not require any research.

## Development Process

I started the development process with creation of a new project using _create-react-app_. After the initiation I have removed unnecessary code from template and add the _redux_ and _react-redux_ packages as dependencies to my project. After this I started planning my project and folder structure. Here is the brief folder structure that us used in the app:

```
// All the components, pages and redux functions are located in src folder
 ./src
  ./components //All components are located here (I tried to keep them reusable)
  ./pages  //Pages that are used inside the app
  ./store //All the Redux logic is located here
    ./actions //Redux actions
    ./reducers //Redux reducers
  App.js // Entry component and wrapper for navigation
  index.js // Here I pass store to my application
  App.css // css styles for the application

```

Since I am using separate pages to represent data I added navigation to the application using _react-router-dom_ library. I have pages for each feed and 404 page. The amount of pages can be easily scaled in the future. I keep navigation links in separate `Navigation` component for easier scalability and styling. Also this component is consistent in all pages.

Each page should represent RSS feed so I started to working on state management. I have created store to which I passed `combinedReducers()` function since there might be more reducers in the future. Currently I have only one reducer for fetching RSS feed. Additionally, I have used _redux-thunk_ middleware because I am making asynchronous calls to fetch RSS feeds. I have created 2 actions for Success and Failure states during the fetching the RSS feed. I additionally used _rss-parser_ library for getting data from RSS links.

Each page inside the application sends the RSS Url to redux and gets response as the list of posts from RSS or error message I show preloading animation from _react-preloaders_ library while the data is being fetched. I use `setInterval()` method in order to update RSS feed every 10 minutes. Additionally it returns a timestamp to show when the last call was made (_moment_ library was used to format dates). In case the response contains data it is passed to `RSSList` component as props and then each individual post is rendered as `RSSItem` using the `array.map()` method.

The new pages in the future can be created using the existing pages as a template. For standard RSS feeds replacing the `rssUrl` value in `fetchRSS` function and renaming component and headings is enough to create a new page showing the information from different RSS feed. Additionally, Inside the pages an additional logic or conditions are applied. Inside the `DatadogPage` I limit the amount of posts to 5 using `array.slice()` method. Inside the AzurePage I use additional `getSystemStatus()` function in order to show that servers are stable in case no data returned from RSS feed.

## License

[MIT](https://choosealicense.com/licenses/mit/)
