// Интерфейс для пользователя на сервере (ServerUser), который включает в себя данные, приходящие из системы управления пользователями
export interface ServerUser {
    id: string;
    keycloakId: string; // Уникальный идентификатор пользователя в системе авторизации
    username: string;
    email: string;
    createdAt: Date;
    updatedAt?: Date;
    lastLoginAt?: Date;
    subscriptionId?: string;
    subscriptionExpiresAt?: string;
    avatarUrl?: string;
  }
  
  // Интерфейс для данных, отправляемых с клиента для регистрации (например, при регистрации нового пользователя)
  export interface ExportUserFromClient {
    username: string; // Имя пользователя
    email: string; // Электронная почта
    password: string; // Пароль
  }
  
  // Интерфейс для данных, приходящих с сервера после успешной авторизации, содержит только безопасные поля, необходимые на клиенте
  export interface ImportUserFromServer {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;
    subscriptionExpiresAt?: string;
    subscriptionName?: string; // Имя подписки, получаемое из данных подписки
  }
  
  // Интерфейс для передачи данных регистрации в систему авторизации
  export interface KeycloakRegistrationPayload {
    username: string;
    email: string;
    password: string;
    clientId: string; // Идентификатор клиента в системе авторизации
  }
  
  // Интерфейс для передачи данных при авторизации пользователя
  export interface KeycloakLoginPayload {
    grantType: 'password'; // Тип авторизации (например, 'password' для логина с паролем)
    clientId: string; // Идентификатор клиента в системе авторизации
    username: string; // Имя пользователя
    password: string; // Пароль пользователя
  }
  
  // Интерфейс для ответа сервера после успешной авторизации или обновления токена
  export interface KeycloakAuthResponse {
    accessToken: string; // Токен доступа, который используется для аутентификации в дальнейшем
    refreshToken: string; // Токен обновления, используется для получения нового accessToken
    idToken?: string; // ID-токен, содержащий информацию о пользователе
    expiresIn: number; // Время жизни accessToken в секундах
    refreshExpiresIn: number; // Время жизни refreshToken в секундах
  }
  
  // Опционально: интерфейс для работы с OAuth, если в дальнейшем будет необходимость использовать социальные авторизации
  export interface OAuthProvider {
    provider: string; // Название провайдера, например, 'google' или 'facebook'
    clientId: string; // Идентификатор клиента для данного провайдера
    redirectUri: string; // URI для перенаправления после успешной авторизации
  }
  