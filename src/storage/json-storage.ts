import { IRepository } from '../interfaces/repository.interface';
import fs from 'fs-extra';
import path from 'path';

export class JsonStorage<T extends { id: string }> implements IRepository<T> {
  private readonly filePath = path.join(__dirname, '..', '..', 'data', 'tasks.json');
  private async getAll(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');

      return JSON.parse(data) as T[];
    } catch (error) {
      return [];
    }
  }

  public async findAll(): Promise<T[]> {
    return this.getAll();
  }

  public async findById(id: string): Promise<T | null> {
    const tasks = await this.getAll();

    return tasks.find((task) => task.id === id) || null;
  }

  public async remove(id: string): Promise<boolean> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }
    tasks.splice(index, 1);
    await fs.outputFile(this.filePath, JSON.stringify(tasks, null, 2));

    return true;
  }

  public async create(data: T): Promise<boolean> {
    const tasks = await this.getAll();

    tasks.push(data);
    await fs.outputFile(this.filePath, JSON.stringify(tasks, null, 2));

    return true;
  }

  public async update(data: T): Promise<boolean> {
    const tasks = await this.getAll();
    const index = tasks.findIndex((task) => task.id === data.id);

    if (index === -1) {
      return false;
    }
    tasks[index] = data;
    await fs.outputFile(this.filePath, JSON.stringify(tasks, null, 2));

    return true;
  }
}
