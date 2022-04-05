import { Mahal } from "mahal";
import App from "@/app.mahal";
import { registerGlobalFormatter } from "@/formatters";
import config from "~/config/env";


export const app = new Mahal(App, '#app');
// register global formatter
registerGlobalFormatter(app);
// set config to be available globally
app.global.env = config;
if (process.env.BUILD_ENV != 'test') {
    app.create();
}