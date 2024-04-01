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

   This command will build the app and launch it on the Android emulator.

### Step 7: Interact with the App

1. Once the app is successfully built and launched, you can interact with it on the Android emulator.

2. Explore the features of the PokeMon app, such as viewing and adding Pokemon to the cart.