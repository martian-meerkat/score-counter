export class OrderBy {
    [key: string]: string;
    name: string;
    order: string;
    constructor({ name = 'none', order = 'off' }) {
      this.name = name;
      this.order = order;
    }
}

export class Player {
    [key: string]: string | number | Date;
    id: number;
    name: string;
    score: number;
    createDate: number | Date;
    constructor({ id = 0, name = '', score = 0, createDate = 0 }) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.createDate =  createDate
    }
}