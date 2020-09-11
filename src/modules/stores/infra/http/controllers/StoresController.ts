import { Request, Response } from 'express';

class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, slug, number } = request.body;

    return response.json({ id, name, slug, number });
  }
}

export default StoresController;
