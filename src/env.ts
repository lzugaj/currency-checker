type ReactEnv = {
  REACT_APP_GATEWAY_BASE_URL: string;
};

interface ReactWindow extends Window {
  REACT_ENV: ReactEnv;
}

declare let window: ReactWindow;
let env = window.REACT_ENV;
/*if (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === "development") {
    env = {
        REACT_APP_GATEWAY_BASE_URL: "http://localhost:8080",
    };
}*/

env = {
  REACT_APP_GATEWAY_BASE_URL: "https://api.hnb.hr/tecajn",
};

export default env;
