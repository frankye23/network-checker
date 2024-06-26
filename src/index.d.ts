declare module 'network-checker-tool' {
  export default class URLChecker {
    constructor(onStatusChange: (status: boolean) => void, urls?: string[], interval?: number);
    stopChecking(): void;
  }
}
