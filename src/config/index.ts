const config = {
    stringifyDefaultOptions: {
        inspectOptions: {
            depth: 5,
            breakLength: 80,
        },
    },
    formattersDefaultParams: {
        string: {
            maxLength: Infinity,
            overflowSuffix: '...',
        },
        date: {
            timezone: 'UTC',
            locale: 'en-US',
        },
        axiosError: {
            maxResponseDataLength: 1024,
            maxRequestDataLength: 1024,
            allowedProperties: [
                'message',
                'stack',
                'response.status',
                'response.statusText',
                'response.headers',
                'response.data',
                'config.baseURL',
                'config.url',
                'config.method',
                'config.headers',
                'config.timeout',
                'config.maxContentLength',
                'config.maxBodyLength',
                'config.data',
            ],
        },
        error: {
            maxMessageLength: Infinity,
            allowedProperties: ['message', 'stack'],
        },
    },
};

export default config;
