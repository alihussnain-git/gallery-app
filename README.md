# Soniq coding challenge Gallery app

<img width="1561" alt="Screenshot 2023-07-11 at 12 43 28" src="https://github.com/alihussnain-git/soniq-coding-challenge-gallery-app/assets/58841397/1ac8d3d5-9672-4b7a-ab2b-c9b51a7e3a1b">


## Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)


## Installation

run `yarn`
This command will install all packages and prepare the development environment to run the app.
```
for building ios after yarn install run 
1. cd ios
2. pod install
```

## Available scripts

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Run tests
```
yarn test
```

### Run Lint
```
yarn lint
```

## Task
https://github.com/servicepartnerone/mobile-coding-challenge#create-a-photo-gallery-application

## Solution
- Create a gallery app using https://picsum.photos images
- Implemented responsive image gallery for all android and iOS devices
- Implemented CRUD functionality for comments with redux toolkit with a complete UX.
- added test coverage using jest and react-native testing library

## Improvements

If I could have more time I would like to do following in this app:

- 12-Factor approach: Using react-native-config to for environment setting like staging, prod etc. Currently base url is hard coded in environment.ts
- Pagination: Pagination to load more images as user scrolls down
- Optimize image loading: Loading a large number of high-resolution images can impact performance, implementing techniques like lazy loading and image caching to improve the loading speed of the gallery.
- Comments functionality to be handled by API to socialize better with others.
- Image caching and offline support: Implement image caching to improve the performance of image loading and enable offline support. Cache the images locally on the device so that they can be viewed even without an internet connection. User should also be able to store image in their phone.
- Image sharing: Allow users to share the photos via social media platforms or other apps installed on their device. Add a share button or menu option that opens the sharing functionality.
- Image search: Implement a search functionality that allows users to search for photos based on keywords, tags, or other metadata. Add a search bar where users can enter their search queries and display the matching results.
