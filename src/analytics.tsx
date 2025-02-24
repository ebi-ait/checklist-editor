import {useEffect} from "react";
import ReactGA from "react-ga4";
import {useLocation} from "react-router-dom";
import config from "./config.tsx";

export function initAnalyticsCollection() {
    ReactGA.initialize(config.GA_MEASUREMENT_ID);
}

export const recordClickEvent = (source) => {
    ReactGA.event({
        category: 'engagement',
        action: source.type,
        label: source.target.innerText,
    });
};

export const usePageTracking = () => {
    const location = useLocation();
    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname
        });
    }, [location]);
};


