import expressWinston from 'express-winston';
import winston from 'winston';

const logFormat = winston.format.combine(
    winston.format.json(),
    winston.format.colorize({ all: true }),
    winston.format.label({ label: '[Identity]' }),
    winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`),
);

winston.addColors({
    info: 'bold blue',
    warn: 'italic yellow',
    error: 'bold red',
    debug: 'green',
});

export const inbound = expressWinston.logger({
    transports: [new winston.transports.Console({ level: 'silly' })],
    format: logFormat,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
});

export const outbound = expressWinston.errorLogger({
    transports: [new winston.transports.Console({ level: 'silly' })],
    format: logFormat,
});
