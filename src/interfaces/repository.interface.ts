export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: T): Promise<boolean>;
  remove(id: string): Promise<boolean>;
  update(data: T): Promise<boolean>;
}
