export const StorageConfig = {
    photo: {
        destination: '../storage/photos/',
        urlPrefix: '/storage/photos/',
        maxAge: 1000 * 60 * 60 * 24 * 7,         // 7 dana
        maxSize: 3 * 1024 * 1024,                // Bytes = 3 MB
        resize: {
            thumb: {
                width: 120,
                height: 100,
                directory: 'thumb/'
            },
            small: {
                width: 320,
                height: 240,
                directory: 'small/'
            },
        },
    },
    
};