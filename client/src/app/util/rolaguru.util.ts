

export class RolaguruUtils {

    protected static rolaguruUtils: RolaguruUtils;

    static getInstance(): RolaguruUtils {
        if (!this.rolaguruUtils) {
            this.rolaguruUtils = new RolaguruUtils();
        }
        return this.rolaguruUtils;
    }

    formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['B', 'KB', 'MB', 'GB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}