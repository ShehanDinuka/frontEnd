export class Client {

  user_id: number;
  name: string;
  email: string;
  assets:number;

  constructor() {
    this.user_id = 0;
    this.name = '';
    this.email = '';
    this.assets = 0;
  }

  toString(): string {
    return 'Client { id=' + this.user_id + ', name=' + this.name + ', email=' + this.email + ' }';
  }
}
