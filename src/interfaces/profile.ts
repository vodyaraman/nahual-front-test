import { ImportUserFromServer } from "./auth";

export interface ProfileState {
    user: ImportUserFromServer | null;
    isLoading: boolean;
    error: string | null;
  }