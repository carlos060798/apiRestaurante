import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  BASE_URL: get('BASE_URL').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),

}



