declare module 'sql.js' {
    export interface SqlJs { Database: new (data?: Uint8Array) => any; [k: string]: any; }
    const init: (opts?: { locateFile?: (file: string) => string }) => Promise<SqlJs>;
    export default init;
  }