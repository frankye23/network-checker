import axios from 'axios';

class URLChecker {
  private urls: string[];
  private interval: number;

  constructor(urls?: string[], interval: number = 60000) {
    this.urls = urls || [
      'https://www.google.com',
      'https://www.baidu.com',
      'https://www.github.com'
    ];
    this.interval = interval;
  }

  private async checkURL(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  public async checkURLs(): Promise<boolean> {
    for (const url of this.urls) {
      if (await this.checkURL(url)) {
        return true;
      }
    }
    return false;
  }

  public startChecking(): void {
    this.checkURLs();
    setInterval(() => this.checkURLs(), this.interval);
  }
}

export default URLChecker