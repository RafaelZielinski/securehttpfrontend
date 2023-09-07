export interface User {
     id: number;
      firstName: string;
      lastName: string;
      email: string;
      address?: string;
      phone?: string;
      title?: string;
      bio: string;
      imageUrl?: string;
      enabled: string;
      isNotLocked: string;
      isUsingMfa: string;
      createdAt?: Date;
      roleName: string;
      permissions: string;
}
