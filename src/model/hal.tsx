export interface HalLink {
    href: string;

    /**
     * Content-type of the target resource
     */
    type?: string;

    /**
     * If set to true, the href should be interpeted as a URI-Template (RFC6570).
     */
    templated?: boolean;

    /**
     * Human readable title for the link
     */
    title?: string;
}

export type HalResource<T extends Record<string, any> = Record<string, any>> = {
    _links: {
        self: HalLink;
        [rel: string]: HalLink | HalLink[];
    };

    _embedded?: {
        [rel: string]: HalResource | HalResource[];
    };
} & T;
