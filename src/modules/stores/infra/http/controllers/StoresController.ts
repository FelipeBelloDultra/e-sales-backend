import { Request, Response } from 'express';

class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true });
  }
}

export default StoresController;
