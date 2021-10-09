import React from "react";
import ReactDOM from "react-dom";
// Context
import { AuthContextProvider } from "./context/AuthContext";
// Because we wrap the whole app, we can access AuthContext state from anywhere in the app
// ie current User

import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
