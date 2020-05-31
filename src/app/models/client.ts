export class Client {

  user_id: number;
  name: string;
  email: string;

  constructor() {
    this.user_id = 0;
    this.name = '';
    this.email = '';
  }

  toString(): string {
    return 'Client { id=' + this.user_id + ', name=' + this.name + ', email=' + this.email + ' }';
  }
}
