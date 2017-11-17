import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Hero } from './hero';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  constructor(private http: Http) {
  }

  private heroesUrl = 'api/heroes';

  headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(respone => respone.json().data as Hero[])
      .catch(this.handlerError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handlerError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handlerError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handlerError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handlerError);
  }

  private handlerError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
