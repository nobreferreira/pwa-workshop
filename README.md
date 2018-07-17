# Progressive Web App - Workshop

  

## Requirements

- Git: [https://git-scm.com/downloads](https://git-scm.com/downloads) 
- Node: [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 
- Firebase: [https://firebase.google.com/docs/cli/?authuser=2](https://firebase.google.com/docs/cli/?authuser=2) 
- Google Chrome: [https://www.google.com/chrome/](https://www.google.com/chrome/) 
- Firebase team number  
- Access to Gmail account: [pwa.ppb.workshop@gmail.com](mailto:pwa.ppb.workshop@gmail.com) 

## Installation

Clone the repo [https://github.com/PaddyPowerBetfair/pwa-workshop](https://github.com/PaddyPowerBetfair/pwa-workshop). You can fork this repo to your account if you want to save your progress of this workshop.

You should be using at least node v8.11.3.

Inside the project folder run ‘npm install’ to install all of the project dependencies.

After the installation is finished you just need to run ‘npm start’ to start the project which is served in [http://localhost:3000/](http://localhost:3000/). 

## Deploying to firebase

Before deploying to firebase you will need to login by running the command ‘firebase login’. For this you will use the account [pwa.ppb.workshop@gmail.com](mailto:pwa.ppb.workshop@gmail.com).

After the last step is finished you need to access the project overview ([https://console.firebase.google.com/u/2/](https://console.firebase.google.com/u/2/)) choose the correct team and copy your firebase config. This configuration needs to be copied into the file ‘config/firebaseConfig.json’.

You will also need to replace all occurrences of ‘pwa-blip-ws-00’ with ‘pwa-ppb-ws-XX’ where XX is your team number.

With this you just need to run the command ‘npm run build’ to generate a production build and ‘firebase deploy’ to publish your application. You can access this application with [https://pwa-ppb-ws-XX.firebaseapp.com/](https://pwa-ppb-ws-xx.firebaseapp.com/) where XX is your team number.

  

## Lighthouse Audits

Throughout this workshop we will be using the Lighthouse Audits to check if our application meets the standards of a Progressive Web App. You can access the Lighthouse through the Audits tab in Chrome DevTools.

  

## Exercises

This workshop is divided in several exercises, each one of them has two branches. The ‘start’ branch has only a list of TODO’s to help you solve the current problem. The ‘end’ branch has our implementation for that exercise.

### 01 - Manifest

In this exercise you will add the following features:

- Set content size for the viewport 
- Provide fallback content when javascript is not available 
- Register a service worker 
- Create a manifest file 

You can check the progress of your solution by running the Lighthouse Audit on Chrome devTools.

Useful links:

- Viewport meta tag [https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) 
- Manifest [https://developers.google.com/web/fundamentals/web-app-manifest/](https://developers.google.com/web/fundamentals/web-app-manifest/) 
- NoScript tag [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) 

### 02 - Cache

To solve this exercise you will need to implement a solution that caches the responses of the application requests. For the purpose of this workshop you will first implement an approach that relies on the stored cache and only allows the request to be made to the server if there is no cached data. Then implement a solution that relies first on the request to the server and only uses the cached data if there is no connectivity.

You can check if the cache is working by disabling the network connectivity in the chrome devTools and refresh the page. If the solution is correctly implemented then the application should still load.

With this implementation you can now install this web application into your phones.

Useful links:

- Service workers [https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 

### 03 - Push Notifications

  

In this part we need to implement a solution that sends a push notification when a new photo is added. For the purpose of this workshop we will use the Firebase Cloud Messaging to delivery our push notifications and Cloud Functions to listen for new photos event.

You can check the progress by deploying the application, accept the subscription popup that will show and then add a new image. The notification should appear in a few seconds.

Useful links:

- Push notifications [https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications)

- Notification properties [https://developers.google.com/web/fundamentals/push-notifications/display-a-notification](https://developers.google.com/web/fundamentals/push-notifications/display-a-notification)

- Web Push [https://github.com/web-push-libs/web-push](https://github.com/web-push-libs/web-push)

### 04 - Background sync

For this exercise you will implement a solution to notify the user when the application regains connectivity after being offline. You will also need to hide the ‘add’ and ‘remove’ buttons to keep the user from performing actions that are not available when there is no internet connection.

You can check if the cache is working by disabling the network connectivity in the chrome devTools and enabling it back.

Useful links:

- Background Sync [https://developers.google.com/web/updates/2015/12/background-sync](https://developers.google.com/web/updates/2015/12/background-sync)
