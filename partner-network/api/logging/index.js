class Logger {

    format(level, message) {
        return `${this.convertLevel(level)} - [${Date.now()}] -> ${message}`;
    }

    convertLevel(level) {
        return (level == 'info') ? '🟢' : (
               (level == 'warn') ? '🟡' : (
               (level == 'error') ? '🔴' : level));
    }

    info(message) {
        console.log(this.format('info', message));
    }

    warn(message) {
        console.log(this.format('warn', message));
    }

    error(message) {
        console.log(this.format('error', message));
    }

    debug(message) {
        console.log(this.format('debug', message));
    }

}

module.exports = new Logger();
