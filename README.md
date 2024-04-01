# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Step 1: Clone the Repository

1. Open a terminal window.

2. Navigate to the directory where you want to store the PokeMon app.

3. Run the following command to clone the repository:

   ```bash
   git clone https://github.com/amartejak/pokemonstore.git
   ```

### Step 2: Navigate to the Project Directory

1. After cloning the repository, navigate to the project directory:

   ```bash
   cd pokemonstore
   ```

### Step 3: Install Dependencies

1. Once inside the project directory, install the necessary dependencies. Run one of the following commands based on your package manager preference:

   Using npm:

   ```bash
   npm install
   ```

   Using Yarn:

   ```bash
   yarn install
   ```

### Step 4: Set Up Android Studio and Emulator

1. Download and install [Android Studio](https://developer.android.com/studio) if you haven't already.

2. Open Android Studio and follow the setup instructions to complete the installation.

3. Once Android Studio is installed, open the AVD Manager (Android Virtual Device Manager) to create an Android emulator.

4. Create a new virtual device by selecting a device definition and configuring the emulator settings.

### Step 5: Start Metro Server

1. To start the Metro server, run the following command:

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

   This command will start the Metro Bundler, which bundles your JavaScript code.

### Step 6: Start the Application

1. Keep the Metro Bundler running in its own terminal window.

2. Open a new terminal window and navigate to the PokeMon project directory if you're not already there.

3. To start the PokeMon app on the Android emulator, run the following command:

   ```bash
   npm run android
   ```

   or

   ```bash
   yarn android
   ```

   This command will build the app and launch it on the Android emulator or if not launched, open the emulator manually.

### Step 7: Interact with the App

1. Once the app is successfully built and launched, you can interact with it on the Android emulator.

2. Explore the features of the PokeMon app, such as viewing and adding Pokemon to the cart.

### Step 7: Completed Stories

1. **Setup and Configuration (Story 1)**: Setting up the React Native project, installing necessary dependencies like Redux and Redux Toolkit, and creating an initial README file with setup instructions.
   
2. **Explore Pokémon (Story 2)**: Fetching Pokémon data from the PokeAPI, displaying Pokémon in a grid layout with names and icons, ensuring the menu is scrollable, and adding code comments for better understanding.

3. **Manage Cart (Story 3)**: Implementing functionality to add Pokémon to the cart, adjust quantities, remove items, and provide a summary view of the cart with selected Pokémon details.

4. **Dynamic Pricing Based on Weight (Bonus Story)**: Calculating the cost of Pokémon in the cart based on their weight attribute fetched from the PokeAPI, and updating the cart's total cost dynamically as items are added, removed, or quantities are changed.

5. **Optimize Performance and User Experience (Bonus Story)**: Implementing efficient data fetching and caching strategies, utilizing memoization and optimizing re-renders for better performance, and designing a user-friendly and responsive interface.

6. **Show the Ability to Log (Bonus Story)**: Implementing comprehensive logging throughout the application, including logging API calls, user actions, and error handling, using a logging library.

7. **Tests**: Had Set up a testing framework Jest for the React Native application.