import axios from 'axios';

class URLChecker {
  private urls: string[];
  private interval: number;
  private intervalId: NodeJS.Timeout | null = null;
  private onStatusChange: (status: boolean) => void;

  constructor(onStatusChange: (status: boolean) => void, urls?: string[], interval: number = 3000) {
    this.urls = urls || [
      'https://www.google.com',
      'https://www.baidu.com',
      'https://www.github.com'
    ];
    this.interval = interval;
    this.onStatusChange = onStatusChange;
    this.startChecking();
  }

  private async checkURL(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  private async checkURLs(): Promise<void> {
    for (const url of this.urls) {
      if (await this.checkURL(url)) {
        this.onStatusChange(true);
        return;
      }
    }
    this.onStatusChange(false);
  }

  private startChecking(): void {
    this.checkURLs();
    this.intervalId = setInterval(() => this.checkURLs(), this.interval);
  }

  public stopChecking(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export default URLChecker;