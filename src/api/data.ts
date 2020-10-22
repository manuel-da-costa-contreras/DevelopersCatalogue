import { get } from './base';

export async function getDevelopers(amount?: number): Promise<any> {
  const response = await get(`https://randomuser.me/api/?results=${amount}`);

  return response;
}

export async function getDeveloper(): Promise<any> {
  const response = await get(`https://randomuser.me/api/`);

  return response;
}
