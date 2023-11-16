import { bool, cleanEnv, json, makeValidator, port, str, num, url, ValidatorSpec } from 'envalid';

const str32 = makeValidator((variable) => {
  if (!(typeof variable === 'string') || variable.length != 32) {
    throw new Error('Expected to be string 32 char long');
  }

  return variable;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validators: { [K in keyof any]: ValidatorSpec<any[K]> } = {
  NODE_ENV: str({
    choices: ['dev', 'test', 'production', 'ci', 'local', 'staging'],
    default: 'local',
  }),
  PORT: port(),
  FRONT_BASE_URL: url(),
  DISABLE_USER_REGISTRATION: str({
    default: 'false',
    choices: ['false', 'true'],
  }),
  JWT_SECRET: str(),
  API_ROOT_URL: str(),
  GLOBAL_CONTEXT_PATH: str(),
  API_CONTEXT_PATH: str(),
  DATABASE_HOST: str(),
  DATABASE_PORT: port(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: num(),
  DATABASE_NAME: str(),
  DATABASE_SCHEMA: str(),
  DATABASE_SYNCHRONIZE: bool(),
  PGADMIN_DEFAULT_EMAIL: str(),
  PGADMIN_DEFAULT_PASSWORD: num(),
  JWT_EXPIRATION_TIME: num(),
  JWT_REFRESH_TOKEN_SECRET: str(),
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: num(),
  GITHUB_OAUTH_CLIENT_ID: str(),
  GITHUB_OAUTH_CLIENT_SECRET: str(),
  GITHUB_OAUTH_REDIRECT: str(),

  // STORE_ENCRYPTION_KEY="<ENCRYPTION_KEY_MUST_BE_32_LONG>"
  // BLUEPRINT_CREATOR=645b648b36dd6d25f8650d37

  // CLIENT_SUCCESS_AUTH_REDIRECT=http://localhost:4200/auth/login

  // #JWT token
  // JWT_ACCESS_TOKEN_EXP_IN_SEC=3600
  // JWT_REFRESH_TOKEN_EXP_IN_SEC=7200
  // JWT_PUBLIC_KEY_BASE64=
  // JWT_PRIVATE_KEY_BASE64=
  // DEFAULT_ADMIN_USER_PASSWORD=admin-example
  // REDIS_HOST: str(),
  // REDIS_PORT: port(),
  // REDIS_TLS: json({
  //   default: undefined,
  // }),

  // SENDGRID_API_KEY: str({
  //   default: '',
  // }),
  MONGO_URL: str(),
  MONGO_MIN_POOL_SIZE: num({
    default: 10,
  }),
  MONGO_MAX_POOL_SIZE: num({
    default: 500,
  }),
  NOVU_API_KEY: str({
    default: '',
  }),
  // STORE_ENCRYPTION_KEY: str32(),
  // NEW_RELIC_APP_NAME: str({
  //   default: '',
  // }),
  // NEW_RELIC_LICENSE_KEY: str({
  //   default: '',
  // }),
  // FF_IS_TOPIC_NOTIFICATION_ENABLED: bool({
  //   desc: 'This is the environment variable used to enable the feature to send notifications to a topic',
  //   default: true,
  //   choices: [false, true],
  // }),
  // REDIS_CACHE_SERVICE_HOST: str({
  //   default: '',
  // }),
  // REDIS_CACHE_SERVICE_PORT: str({
  //   default: '',
  // }),
  // REDIS_CACHE_SERVICE_TLS: json({
  //   default: undefined,
  // }),
  // REDIS_CLUSTER_SERVICE_HOST: str({
  //   default: '',
  // }),
  // REDIS_CLUSTER_SERVICE_PORTS: str({
  //   default: '',
  // }),
  // STORE_NOTIFICATION_CONTENT: str({
  //   default: 'false',
  // }),
  // LAUNCH_DARKLY_SDK_KEY: str({
  //   default: '',
  // }),
  // WORKER_DEFAULT_CONCURRENCY: num({
  //   default: undefined,
  // }),
  // WORKER_DEFAULT_LOCK_DURATION: num({
  //   default: undefined,
  // }),
};

// if (process.env.STORAGE_SERVICE === 'AZURE') {
//   validators.AZURE_ACCOUNT_NAME = str();
//   validators.AZURE_ACCOUNT_KEY = str();
//   validators.AZURE_HOST_NAME = str({
//     default: `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net`,
//   });
//   validators.AZURE_CONTAINER_NAME = str({
//     default: 'novu',
//   });
// }

// if (process.env.STORAGE_SERVICE === 'GCS') {
//   validators.GCS_BUCKET_NAME = str();
//   validators.GCS_DOMAIN = str();
// }

// if (process.env.STORAGE_SERVICE === 'AWS' || !process.env.STORAGE_SERVICE) {
//   validators.S3_LOCAL_STACK = str({
//     default: '',
//   });
//   validators.S3_BUCKET_NAME = str();
//   validators.S3_REGION = str();
//   validators.AWS_ACCESS_KEY_ID = str();
//   validators.AWS_SECRET_ACCESS_KEY = str();
// }

// if (process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test') {
//   validators.SENTRY_DSN = str({
//     default: '',
//   });
//   validators.VERCEL_CLIENT_ID = str({
//     default: '',
//   });
//   validators.VERCEL_CLIENT_SECRET = str({
//     default: '',
//   });
//   validators.VERCEL_REDIRECT_URI = url({
//     default: 'https://web.novu.co/auth/login',
//   });
//   validators.VERCEL_BASE_URL = url({
//     default: 'https://api.vercel.com',
//   });
// }

export function validateEnv() {
  cleanEnv(process.env, validators);
}
