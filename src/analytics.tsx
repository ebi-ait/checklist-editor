import {useEffect} from "react";
import {useRecordContext, useResourceContext} from "react-admin";
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

export const TrackResourcePage = ({ action }) => {
    const record = useRecordContext(); // Works inside <Show> and <Edit>
    const resource = useResourceContext();

    useEffect(() => {

        if (record) {
            ReactGA.event({
                category: 'user_engagement',
                action: `${resource} ${action}`,
                label: record.id, // Track the specific record ID
            });
            console.log(`GA Event Sent: ${resource} ${action}`, record.id);
        }
    }, [resource, action, record]);

    return null; // No UI, just tracking
};


export const usePageViewTracking = () => {
    const location = useLocation();
    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname
        });

    }, [location]);
};


