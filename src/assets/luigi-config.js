window.Luigi.setConfig({
  navigation: {
    nodes: [
      {
        pathSegment: 'home',
        label: 'Home',
        viewUrl: 'angular.html'
      },
      {
        pathSegment: 'search',
        label: 'Search',
        viewUrl: '/webComponents/bundles.json',
        webComponent: true ``
      },
      {
        pathSegment: 'store',
        label: 'Store',
        viewUrl: '/webComponents/bundles.json',
        webComponent: true
      }
    ]
  }
});
