import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStoreService from '@modules/stores/services/CreateStoreService';
import ListOneStoreBySlugService from '@modules/stores/services/ListOneStoreBySlugService';

class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, slug, number } = request.body;

    const createStore = container.resolve(CreateStoreService);

    const store = await createStore.execute({
      name,
      number,
      slug,
      user_id: id,
    });

    return response.json(store);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { slug } = request.params;

    const listOneBySlug = container.resolve(ListOneStoreBySlugService);

    const store = await listOneBySlug.execute({ user_id: id, slug });

    return response.json(store);
  }
}

export default StoresController;
