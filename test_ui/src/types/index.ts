export interface User {
    id: string;
    username: string;
    email: string;
  }


  export interface AuthContextType {
    user: User | null;
    register: (username: string, password: string) => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    error: string | null;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    email: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
  }
  
  export interface ApiError {
    message: string;
    statusCode: number;
  }
  
  export interface Item {
    id: string;
    name: string;
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface ItemCreateData {
    name: string;
    description: string;
  }


export interface FormField {
  type: 'text' | 'password' | 'email' | 'hidden';
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

// Form props interface
export interface FormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => Promise<boolean>;
  submitButtonText: string;
  successMessage: string;
  successRedirectPath: string;
  className?: string;
}