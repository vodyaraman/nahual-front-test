// Интерфейс для пользователя на сервере (ServerUser), который включает в себя данные, приходящие из системы управления пользователями
export interface ServerUser {
    id: string;
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
    username?: string; // Имя пользователя
    email?: string; // Электронная почта
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

  export interface LoginPayload {
    accessToken: string;
    refreshToken: string;
  }

  // Опционально: интерфейс для работы с OAuth, если в дальнейшем будет необходимость использовать социальные авторизации
  export interface OAuthProvider {
    provider: string; // Название провайдера, например, 'google' или 'facebook'
    clientId: string; // Идентификатор клиента для данного провайдера
    redirectUri: string; // URI для перенаправления после успешной авторизации
  }
