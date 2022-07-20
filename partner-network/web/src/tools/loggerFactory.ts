
export enum LogMessageType {
    default,
    info,
    error,
    warning,
    success,
}

export function loggerFactory(name: string) {
    const upperCase = name.toUpperCase();

    return (message: any, type: LogMessageType = LogMessageType.default) => {
        let color;
        switch (type) {
            case LogMessageType.success:
                color = 'Green'
                break
            case LogMessageType.info:
                color = 'Blue'
                break;
            case LogMessageType.error:
                color = 'Red'
                break;
            case LogMessageType.warning:
                color = 'Orange'
                break;
            default:
                color = 'Black'
        }

        console.log(`%c[${upperCase}]: ${message}`, `color:${color}`)
    };
}
